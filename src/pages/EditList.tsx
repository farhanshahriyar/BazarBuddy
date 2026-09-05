

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGrocery } from "@/contexts/GroceryContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/currency";
import { getText, formatUnit } from "@/utils/translations";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GroceryItemForm } from "@/components/GroceryItemForm";
import { GroceryItemTable } from "@/components/GroceryItemTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Download, Loader2, Save, Search, Trash, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { PDFPreview } from "@/components/PDFPreview";

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_BN = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 8 }, (_, i) => CURRENT_YEAR - 2 + i);

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toBengaliNumerals, toArabicNumerals } from "@/utils/numbers";

const EditList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getListById, updateList, deleteList, downloadListAsPdf, isLoading: groceryLoading } = useGrocery();
  const { isLoading: authLoading } = useAuth();
  const { language, isEnglish } = useLanguage();

  const isLoading = groceryLoading || authLoading;

  const [title, setTitle] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [listExists, setListExists] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [itemSearchTerm, setItemSearchTerm] = useState("");

  const displayMonths = isEnglish ? MONTHS_EN : MONTHS_BN;

  useEffect(() => {
    if (authLoading || groceryLoading) return;

    if (id) {
      const list = getListById(id);
      if (list) {
        if (!listExists) {
          setTitle(list.title || "");
          setSelectedMonth(list.month || "");
          setSelectedYear(list.year?.toString() || "");
          setListExists(true);
        }
        setInitialLoading(false);
      } else {
        toast({
          title: getText("listNotFound", language),
          description: getText("listNotFoundDesc", language),
          variant: "destructive"
        });
        navigate("/dashboard");
      }
    }
  }, [id, authLoading, groceryLoading, listExists, language, getListById, navigate]);

  const handleUpdateList = async () => {
    if (!id) return;
    if (!title) {
      toast({
        title: getText("missingInfo", language),
        description: getText("pleaseProvideTitle", language),
        variant: "destructive"
      });
      return;
    }
    if (!selectedMonth || !selectedYear) {
      toast({
        title: getText("missingInfo", language),
        description: isEnglish ? "Please select a month and year." : "অনুগ্রহ করে মাস এবং বছর নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }

    setIsUpdating(true);
    try {
      await updateList(id, { title, month: selectedMonth, year: parseInt(selectedYear, 10) });
    } catch (error) {
      console.error("Error updating list:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteList = async () => {
    if (id) {
      try {
        await deleteList(id);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting list:", error);
      }
    }
  };

  const handleDownloadPdf = async () => {
    if (id) {
      try {
        await downloadListAsPdf(id);
      } catch (error) {
        console.error("Error downloading PDF:", error);
        toast({
          title: getText("pdfError", language),
          description: getText("pdfFallback", language),
          variant: "destructive"
        });
        setShowPDFPreview(true);
      }
    }
  };

  if (initialLoading || (!listExists && (groceryLoading || authLoading))) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!listExists) return null;

  const list = getListById(id!);
  const totalPrice = list ? list.totalEstimatedPrice : 0;

  const normalizedSearch = itemSearchTerm.trim().toLowerCase();
  const arabicSearch = toArabicNumerals(normalizedSearch);

  const filteredItems = (list?.items || []).filter(item => {
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

  const filteredTotalPrice = filteredItems.reduce(
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">
              {isEnglish ? selectedMonth : MONTHS_BN[MONTHS_EN.indexOf(selectedMonth)]} {isEnglish ? selectedYear : toBengaliNumerals(selectedYear)} • {isEnglish ? list?.items.length || 0 : toBengaliNumerals(list?.items.length || 0)} {getText("items", language)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownloadPdf} disabled={isLoading} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {getText("print", language)}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  {getText("deleteList", language)}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{getText("areYouSure", language)}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {getText("groceryList", language)} "{title}", {getText("deleteWarning", language)}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{getText("cancel", language)}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteList} className="bg-destructive text-destructive-foreground">
                    {getText("delete", language)}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <PDFPreview open={showPDFPreview} onOpenChange={setShowPDFPreview} listId={id!} listName={title} />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{getText("listInformation", language)}</CardTitle>
              <CardDescription>{getText("listDetails", language)}</CardDescription>
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
                      {MONTHS_EN.map((month, i) => (
                        <SelectItem key={month} value={month}>
                          {isEnglish ? month : MONTHS_BN[i]}
                        </SelectItem>
                      ))}
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
                      {YEARS.map(year => (
                        <SelectItem key={year.toString()} value={year.toString()}>
                          {isEnglish ? year : toBengaliNumerals(year.toString())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleUpdateList} disabled={isUpdating || groceryLoading} className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50">
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {getText("saving", language)}
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {getText("saveChanges", language)}
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-orange-600 text-white border-none">
                  <p>{getText("saveListTooltip", language)}</p>
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{getText("addItem", language)}</CardTitle>
              <CardDescription>{getText("addNewItem", language)}</CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <GroceryItemForm listId={id!} />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-left">{getText("itemsInList", language)}</CardTitle>
                <CardDescription className="text-left">
                  {normalizedSearch ? (
                    isEnglish
                      ? `${filteredItems.length} of ${list?.items.length || 0} items found • Filtered total: ${formatCurrency(filteredTotalPrice, "BDT")}`
                      : `${toBengaliNumerals(list?.items.length || 0)} টির মধ্যে ${toBengaliNumerals(filteredItems.length)} টি আইটেম পাওয়া গেছে • ফিল্টার করা মোট: ${formatCurrency(filteredTotalPrice, "BDT", true)}`
                  ) : (
                    isEnglish
                      ? `${list?.items.length || 0} items • Estimated total: ${formatCurrency(totalPrice, "BDT")}`
                      : `${toBengaliNumerals(list?.items.length || 0)} আইটেম • অনুমানিত মোট: ${formatCurrency(totalPrice, "BDT", true)}`
                  )}
                </CardDescription>
              </div>
              {((list?.items.length || 0) > 0 || itemSearchTerm) && (
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
            {list && (
              <GroceryItemTable
                listId={id!}
                items={filteredItems}
                disableDnD={!!normalizedSearch}
                isSearching={!!normalizedSearch}
                searchTerm={itemSearchTerm.trim()}
                onClearSearch={() => setItemSearchTerm("")}
              />
            )}
          </CardContent>
        </Card>
      </DashboardLayout>
    </TooltipProvider>
  );
};

export default EditList;
