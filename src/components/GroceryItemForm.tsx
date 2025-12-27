import { useEffect, useState } from "react";
import { useGrocery, GroceryItem } from "@/contexts/GroceryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Pencil, Plus, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { isValidNumber, parseBengaliFloat, toBengaliNumerals } from "@/utils/numbers";

interface GroceryItemFormProps {
  listId: string;
  item?: GroceryItem;
  onSubmit?: (item?: GroceryItem) => void;
  isCreatePage?: boolean;
}
const UNITS = ["kg", "g", "lb", "pcs", "l", "ml", "dozen"];
const UNITS_BN = ["কেজি", "গ্রাম", "পাউন্ড", "পিস", "লিটার", "মিলিলিটার", "ডজন"];
export function GroceryItemForm({
  listId,
  item,
  onSubmit,
  isCreatePage = false
}: GroceryItemFormProps) {
  const {
    language,
    isEnglish
  } = useLanguage();
  const {
    addItemToList,
    updateItemInList,
    generatePriceSuggestion,
    isLoading
  } = useGrocery();
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity.toString() || "1");
  const [unit, setUnit] = useState(item?.unit || "kg");
  const [estimatedPrice, setEstimatedPrice] = useState(item?.estimatedPrice ? item.estimatedPrice.toString() : "");
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);
  const handleQuantityChange = (value: string) => {
    // Only allow positive numbers (Arabic or Bengali)
    if (isValidNumber(value)) {
      setQuantity(value);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast({
        title: isEnglish ? "Missing Information" : "তথ্য অনুপস্থিত",
        description: isEnglish ? "Please provide an item name." : "অনুগ্রহ করে আইটেমের নাম প্রদান করুন।",
        variant: "destructive"
      });
      return;
    }
    setLocalLoading(true);
    try {
      const parsedQuantity = parseBengaliFloat(quantity) || 1;
      const parsedPrice = estimatedPrice ? parseBengaliFloat(estimatedPrice) : null;

      if (isCreatePage) {
        // For create page, we work with local state (not database)
        if (item) {
          // Editing an existing item in local state
          const updatedItem: GroceryItem = {
            ...item,
            name,
            quantity: parsedQuantity,
            unit,
            estimatedPrice: parsedPrice || 0
          };
          if (onSubmit) {
            onSubmit(updatedItem);
          }
        } else {
          // Adding a new item to local state
          const newItem: GroceryItem = {
            id: uuidv4(),
            name,
            quantity: parsedQuantity,
            unit,
            estimatedPrice: parsedPrice || 0
          };
          if (onSubmit) {
            onSubmit(newItem);
          }
        }
        // Reset form after adding new item (not when editing)
        if (!item) {
          setName("");
          setQuantity("1");
          setUnit("kg");
          setEstimatedPrice("");
        }
      } else {
        // For existing lists in database
        if (item) {
          // Update existing item in database
          await updateItemInList(listId, item.id, {
            name,
            quantity: parsedQuantity,
            unit,
            estimatedPrice: parsedPrice
          });
          if (onSubmit) {
            onSubmit(item);
          }
        } else {
          // Add new item to database
          await addItemToList(listId, {
            name,
            quantity: parsedQuantity,
            unit
          });
          // Reset form
          setName("");
          setQuantity("1");
          setUnit("kg");
          setEstimatedPrice("");
          if (onSubmit) {
            onSubmit();
          }
        }
      }
    } catch (error) {
      console.error("Error submitting item:", error);
    } finally {
      setLocalLoading(false);
    }
  };
  const handleGeneratePrice = async () => {
    if (!name || !quantity) {
      toast({
        title: isEnglish ? "Missing Information" : "তথ্য অনুপস্থিত",
        description: isEnglish ? "Please provide a name and quantity for the item." : "অনুগ্রহ করে আইটেমের নাম এবং পরিমাণ প্রদান করুন।",
        variant: "destructive"
      });
      return;
    }
    try {
      setIsGeneratingPrice(true);
      const parsedQty = parseBengaliFloat(quantity) || 1;
      const priceBdt = await generatePriceSuggestion(name, parsedQty, unit);
      setEstimatedPrice(priceBdt.toFixed(2));

      // Format the toast message according to the specified examples with +50 BDT notation
      const toastDescription = isEnglish ? `Estimated price for ${quantity} ${unit} of "${name}" in Bangladeshi Taka: ${priceBdt} (includes +50 BDT)` : `${toBengaliNumerals(quantity)} ${unit} "${name}" এর অনুমানিত মূল্য বাংলাদেশি টাকায়: ${toBengaliNumerals(priceBdt.toFixed(2))} (+৫০ টাকা সহ)`;
      toast({
        title: isEnglish ? "Price Generated" : "মূল্য তৈরি হয়েছে",
        description: toastDescription
      });
    } catch (error) {
      console.error("Error generating price:", error);
      toast({
        title: isEnglish ? "Error" : "ত্রুটি",
        description: isEnglish ? "Failed to generate price suggestion." : "মূল্য প্রস্তাব তৈরি করতে ব্যর্থ।",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPrice(false);
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-1.5">
      <Label htmlFor="name">{isEnglish ? "Item Name" : "আইটেমের নাম"}</Label>
      <Input id="name" placeholder={isEnglish ? "e.g., Rice, Chicken, Eggs" : "যেমন, চাল, মুরগি, ডিম"} value={name} onChange={e => setName(e.target.value)} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="quantity">{isEnglish ? "Quantity" : "পরিমাণ"}</Label>
        <Input id="quantity" type="text" inputMode="decimal" placeholder="1" value={quantity} onChange={e => handleQuantityChange(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="unit">{isEnglish ? "Unit" : "একক"}</Label>
        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger id="unit">
            <SelectValue placeholder={isEnglish ? "Select unit" : "একক নির্বাচন করুন"} />
          </SelectTrigger>
          <SelectContent position="popper">
            {UNITS.map((u, index) => <SelectItem key={u} value={u}>
              {isEnglish ? u : UNITS_BN[index]}
            </SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor="price">{isEnglish ? "Estimated Price (BDT)" : "অনুমানিত মূল্য (৳)"}</Label>
        <div className="flex items-center gap-1">
          <Button type="button" size="sm" variant="outline" onClick={() => setIsManualEdit(!isManualEdit)} title={isEnglish ? "Manual" : "ম্যানুয়াল সম্পাদনা"}>
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            {isEnglish ? "Manual" : "ম্যানুয়াল"}
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={handleGeneratePrice} disabled={isGeneratingPrice || !name || !quantity}>
            {isGeneratingPrice ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
            {isEnglish ? "Generate" : "তৈরি করুন"}
          </Button>
        </div>
      </div>
      <Input id="price" disabled={!isManualEdit} type="text" inputMode="decimal" placeholder="0.00" value={estimatedPrice} onChange={e => {
        if (isValidNumber(e.target.value)) {
          setEstimatedPrice(e.target.value);
        }
      }} />

    </div>
    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50" disabled={isLoading || localLoading}>
      {isLoading || localLoading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : item ? isEnglish ? "Update Item" : "আইটেম আপডেট করুন" : <>
        <Plus className="mr-1.5 h-4 w-4" />
        {isEnglish ? "Add Item" : "আইটেম যোগ করুন"}
      </>}
    </Button>
  </form>;
}