

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGrocery } from "@/contexts/GroceryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/utils/currency";
import { getText } from "@/utils/translations";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GroceryItemForm } from "@/components/GroceryItemForm";
import { GroceryItemTable } from "@/components/GroceryItemTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Download, Loader2, Save, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { PDFPreview } from "@/components/PDFPreview";

const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_BN = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR + i);

const EditList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getListById, updateList, deleteList, downloadListAsPdf, isLoading } = useGrocery();
  const { language, isEnglish } = useLanguage();

  const [title, setTitle] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [localLoading, setLocalLoading] = useState(true);
  const [listExists, setListExists] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const displayMonths = isEnglish ? MONTHS_EN : MONTHS_BN;

  useEffect(() => {
    if (id) {
      const list = getListById(id);
      if (list) {
        setTitle(list.title);
        setSelectedMonth(list.month);
        setSelectedYear(list.year.toString());
        setListExists(true);
      } else {
        toast({
          title: getText("listNotFound", language),
          description: getText("listNotFoundDesc", language),
          variant: "destructive"
        });
        navigate("/dashboard");
      }
    }
    setLocalLoading(false);
  }, [id, getListById, navigate]);

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

    try {
      await updateList(id, { title, month: selectedMonth, year: parseInt(selectedYear) });
    } catch (error) {
      console.error("Error updating list:", error);
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

  if (localLoading || isLoading) {
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

  return (
    <DashboardLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">
            {selectedMonth} {selectedYear} • {list?.items.length || 0} {getText("items", language)}
          </p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" onClick={() => setShowPDFPreview(true)} className="flex items-center">
            {getText("previewPdf", language)}
          </Button> */}
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
                  {/* {getText("deleteWarning", language)} "{title}" {getText("groceryList", language)}. */}
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
              <Label htmlFor="title">{getText("listTitle", language)}</Label>
              <Input id="title" placeholder={isEnglish ? "April Groceries" : "এপ্রিল মুদি"} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="month">{getText("month", language)}</Label>
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
                <Label htmlFor="year">{getText("year", language)}</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder={getText("selectYear", language)} />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {YEARS.map(year => (
                      <SelectItem key={year.toString()} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpdateList} disabled={isLoading} className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50">
              {isLoading ? (
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
          <CardTitle>{getText("itemsInList", language)}</CardTitle>
          <CardDescription>
            {isEnglish
              ? `${list?.items.length || 0} items • Estimated total: ${formatCurrency(totalPrice, "BDT")}`
              : `${list?.items.length || 0} আইটেম • অনুমানিত মোট: ${formatCurrency(totalPrice, "BDT")}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {list && <GroceryItemTable listId={id!} items={list.items} />}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default EditList;
