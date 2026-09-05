import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGrocery, GroceryItem } from "@/contexts/GroceryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/currency";
import { getText, formatUnit } from "@/utils/translations";

import { DashboardLayout } from "@/components/DashboardLayout";
import { GroceryItemForm } from "@/components/GroceryItemForm";
import { GroceryItemTable } from "@/components/GroceryItemTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Save, Search, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({
  length: 8
}, (_, i) => CURRENT_YEAR - 2 + i);

// Bengali month names
const MONTHS_BN = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toBengaliNumerals, toArabicNumerals } from "@/utils/numbers";

const CreateList = () => {
  const navigate = useNavigate();
  const {
    language,
    isEnglish
  } = useLanguage();
  const {
    createList,
    isLoading
  } = useGrocery();
  const currentMonth = new Date().getMonth(); // 0-indexed

  const [title, setTitle] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentMonth]);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR.toString());
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [itemSearchTerm, setItemSearchTerm] = useState("");
  const handleCreateList = async () => {
    if (!title) {
      toast({
        title: getText("missingInfo", language),
        description: getText("pleaseProvideTitle", language),
        variant: "destructive"
      });
      return;
    }
    if (items.length === 0) {
      toast({
        title: getText("emptyList", language),
        description: getText("emptyListDesc", language),
        variant: "destructive"
      });
      return;
    }
    try {
      const listId = await createList({
        title,
        month: selectedMonth,
        year: parseInt(selectedYear),
        items
      });
      navigate(`/edit-list/${listId}`);
    } catch (error) {
      console.error("Error creating list:", error);
      // Error is already handled in the context
    }
  };
  const addItemToList = (item: GroceryItem) => {
    setItems([...items, item]);
  };
  const removeItemFromList = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItemInList = (updatedItem: GroceryItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };
  const tempListId = "temp-new-list";

  // Use the appropriate month names based on language
  const displayMonths = isEnglish ? MONTHS : MONTHS_BN;

  // Calculate the total price in BDT
  const totalPriceBdt = items.reduce((total, item) => total + (item.estimatedPrice || 0), 0);

  // Filter items based on search term
  const normalizedSearch = itemSearchTerm.trim().toLowerCase();
  const arabicSearch = toArabicNumerals(normalizedSearch);

  const filteredItems = items.filter(item => {
    if (!normalizedSearch) return true;

    // Check item name
    if (item.name.toLowerCase().includes(normalizedSearch)) return true;

    // Check unit
    if (item.unit && (item.unit.toLowerCase().includes(normalizedSearch) || formatUnit(item.unit, "bn").toLowerCase().includes(normalizedSearch))) return true;

    // Check quantity in Arabic and Bengali numerals
    const qtyStr = item.quantity.toString();
    const qtyBn = toBengaliNumerals(item.quantity);
    if (qtyStr.includes(arabicSearch) || qtyBn.includes(normalizedSearch)) return true;

    // Check estimated price in Arabic and Bengali numerals
    if (item.estimatedPrice != null) {
      const priceStr = item.estimatedPrice.toString();
      const priceBn = toBengaliNumerals(priceStr);
      if (priceStr.includes(arabicSearch) || priceBn.includes(normalizedSearch)) return true;
    }

    return false;
  });

  const filteredTotalPriceBdt = filteredItems.reduce(
    (total, item) => total + (item.estimatedPrice || 0),
    0
  );

  return (
    <TooltipProvider delayDuration={300}>
      <DashboardLayout>
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{getText("createNewList", language)}</h1>
            <p className="text-muted-foreground">
              {getText("addItems", language)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* List Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>{getText("listInformation", language)}</CardTitle>
              <CardDescription className="text-left">
                {getText("listDetails", language)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="space-y-1.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="title" className="cursor-help">{getText("listTitle", language)}</Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{getText("listTitleTooltip", language)}</p>
                  </TooltipContent>
                </Tooltip>
                <Input id="title" placeholder={isEnglish ? "April Groceries" : "এপ্রিল মুদি"} value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="month" className="cursor-help">{getText("month", language)}</Label>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{getText("monthTooltip", language)}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger id="month">
                      <SelectValue placeholder={getText("selectMonth", language)} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {MONTHS.map((month, index) => <SelectItem key={month} value={month}>
                        {isEnglish ? month : MONTHS_BN[index]}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="year" className="cursor-help">{getText("year", language)}</Label>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{getText("yearTooltip", language)}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger id="year">
                      <SelectValue placeholder={getText("selectYear", language)} />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {YEARS.map(year => <SelectItem key={year} value={year.toString()}>
                        {isEnglish ? year : toBengaliNumerals(year.toString())}
                      </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleCreateList} disabled={isLoading} className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50 mt-2">
                    {isLoading ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {getText("saving", language)}
                    </> : <>
                      <Save className="mr-2 h-4 w-4" />
                      {getText("saveList", language)}
                    </>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-orange-600 text-white border-none">
                  <p>{getText("saveListTooltip", language)}</p>
                </TooltipContent>
              </Tooltip>
            </CardContent>

          </Card>

          {/* Add Item Form */}
          <Card>
            <CardHeader>
              <CardTitle>{getText("addItem", language)}</CardTitle>
              <CardDescription>
                {getText("addNewItem", language)}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <GroceryItemForm listId={tempListId} onSubmit={newItem => newItem && addItemToList(newItem)} isCreatePage={true} />
            </CardContent>
          </Card>
        </div>

        {/* List Preview */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-left">{getText("itemsInList", language)}</CardTitle>
                <CardDescription className="text-left">
                  {normalizedSearch ? (
                    isEnglish
                      ? `${filteredItems.length} of ${items.length} items found • Filtered total: ${formatCurrency(filteredTotalPriceBdt, 'BDT')}`
                      : `${toBengaliNumerals(items.length)} টির মধ্যে ${toBengaliNumerals(filteredItems.length)} টি আইটেম পাওয়া গেছে • ফিল্টার করা মোট: ${formatCurrency(filteredTotalPriceBdt, 'BDT', true)}`
                  ) : (
                    isEnglish
                      ? `${items.length} items • Estimated total: ${formatCurrency(totalPriceBdt, 'BDT')}`
                      : `${toBengaliNumerals(items.length)} আইটেম • অনুমানিত মোট: ${formatCurrency(totalPriceBdt, 'BDT', true)}`
                  )}
                </CardDescription>
              </div>
              {(items.length > 0 || itemSearchTerm) && (
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    placeholder={getText("searchItems", language)}
                    value={itemSearchTerm}
                    onChange={e => setItemSearchTerm(e.target.value)}
                    className="pl-9 pr-8 h-9 text-sm"
                  />
                  {itemSearchTerm && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setItemSearchTerm("")}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                      title={getText("clearSearch", language)}
                    >
                      <X className="h-3.5 w-3.5" />
                      <span className="sr-only">{getText("clearSearch", language)}</span>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <GroceryItemTable
              listId={tempListId}
              items={filteredItems}
              onDelete={removeItemFromList}
              onUpdate={updateItemInList}
              onReorder={(reorderedItems) => {
                if (itemSearchTerm.trim()) {
                  return;
                }
                setItems(reorderedItems);
              }}
              isCreatePage={true}
              disableDnD={!!normalizedSearch}
              isSearching={!!normalizedSearch}
              searchTerm={itemSearchTerm.trim()}
              onClearSearch={() => setItemSearchTerm("")}
            />
          </CardContent>
        </Card>
      </DashboardLayout>
    </TooltipProvider>
  );
};
export default CreateList;