// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGrocery } from "@/contexts/GroceryContext";
// import { useLanguage } from "@/contexts/LanguageContext";
// import { DashboardLayout } from "@/components/DashboardLayout";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Calendar, Download, Loader2, Search, ShoppingCart } from "lucide-react";
// import { getText } from "@/utils/translations";
// import { Trash } from "lucide-react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle
// } from "@/components/ui/alert-dialog";
// import { useToast } from "@/hooks/use-toast";

// const ListHistory = () => {
//   const {
//     lists,
//     isLoading,
//     downloadListAsPdf
//   } = useGrocery();
//   const {
//     language
//   } = useLanguage();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   // Delete funtionality state
//   const [listToDelete, setListToDelete] = useState<string | null>(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const { toast } = useToast();

//   // Function to handle list deletion
//   const {
//     lists,
//     isLoading,
//     downloadListAsPdf,
//     deleteList
//   } = useGrocery();

//   // Delete handle function
//   const handleDeleteClick = (id: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     setListToDelete(id);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!listToDelete) return;
//     setIsDeleting(true);
//     try {
//       await deleteList(listToDelete);
//       toast({
//         title: language === "en" ? "List Deleted" : "তালিকা মুছে ফেলা হয়েছে",
//         description: language === "en"
//           ? "The grocery list has been successfully deleted."
//           : "মুদি তালিকাটি সফলভাবে মুছে ফেলা হয়েছে।"
//       });
//     } catch (error) {
//       console.error("Error deleting list:", error);
//       toast({
//         title: language === "en" ? "Error" : "ত্রুটি",
//         description: language === "en"
//           ? "Failed to delete list. Please try again."
//           : "তালিকা মুছতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
//         variant: "destructive"
//       });
//     } finally {
//       setIsDeleting(false);
//       setListToDelete(null);
//     }
//   };


//   // Filter and sort lists by creation date (newest first)
//   const filteredLists = lists.filter(list => list.title.toLowerCase().includes(searchTerm.toLowerCase()) || list.month.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//   const handleDownloadPdf = async (id: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     try {
//       await downloadListAsPdf(id);
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//     }
//   };
//   if (isLoading) {
//     return <DashboardLayout>
//       <div className="flex justify-center items-center h-[50vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     </DashboardLayout>;
//   }
//   return <DashboardLayout>
//     <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           {getText("listHistory", language)}
//         </h1>
//         <p className="text-muted-foreground">
//           {getText("viewManageLists", language)}
//         </p>
//       </div>
//       <div className="w-full md:w-auto relative">
//         <Input placeholder={getText("searchLists", language)} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="md:w-[250px] pl-8" />
//         <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
//       </div>
//     </div>

//     <Card>
//       <CardHeader>
//         <CardTitle>{getText("yourGroceryLists", language)}</CardTitle>
//         <CardDescription>
//           {filteredLists.length} {getText("listsTotal", language)}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {filteredLists.length === 0 ? <div className="flex flex-col items-center justify-center py-8 text-center">
//           {searchTerm ? <>
//             <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
//             <p className="text-muted-foreground mb-2">
//               {getText("noListsMatch", language)}
//             </p>
//             <Button variant="link" onClick={() => setSearchTerm("")}>
//               {getText("clearSearch", language)}
//             </Button>
//           </> : <>
//             <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-4" />
//             <p className="text-muted-foreground mb-4">
//               {getText("noListsYet", language)}
//             </p>
//             <Button onClick={() => navigate("/create-list")} className="bg-orange-600 hover:bg-orange-500 text-gray-50">
//               {getText("createFirstList", language)}
//             </Button>
//           </>}
//         </div> : <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>{getText("listName", language)}</TableHead>
//                 <TableHead>{getText("month", language)}</TableHead>
//                 <TableHead>{getText("items", language)}</TableHead>
//                 <TableHead className="text-right">{getText("estCost", language)}</TableHead>
//                 <TableHead className="text-right">{getText("createdOn", language)}</TableHead>
//                 <TableHead className="w-[50px]"></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredLists.map(list => {
//                 const createdDate = new Date(list.createdAt);
//                 return <TableRow key={list.id} className="cursor-pointer" onClick={() => navigate(`/edit-list/${list.id}`)}>
//                   <TableCell className="font-medium">{list.title}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center">
//                       <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
//                       {list.month} {list.year}
//                     </div>
//                   </TableCell>
//                   <TableCell>{list.items.length} {getText("items", language)}</TableCell>
//                   <TableCell className="text-right">
//                     ${list.totalEstimatedPrice.toFixed(2)}
//                   </TableCell>
//                   <TableCell className="text-right text-muted-foreground">
//                     {createdDate.toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>
//                     <Button variant="ghost" size="sm" onClick={e => handleDownloadPdf(list.id, e)} className="h-8 px-2">
//                       <Download className="h-4 w-4" />
//                       <span className="sr-only">Download PDF</span>
//                     </Button>
//                   </TableCell>
//                 </TableRow>;
//               })}
//             </TableBody>
//           </Table>
//         </div>}
//       </CardContent>
//     </Card>
//   </DashboardLayout>;
// };
// export default ListHistory;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGrocery } from "@/contexts/GroceryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Download, Loader2, Search, ShoppingCart, Trash } from "lucide-react";
import { getText } from "@/utils/translations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const ListHistory = () => {
  const {
    lists,
    isLoading,
    downloadListAsPdf,
    deleteList
  } = useGrocery();

  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [listToDelete, setListToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDeleteClick = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setListToDelete(id);
  };

  const handleDeleteConfirm = async () => {
    if (!listToDelete) return;
    setIsDeleting(true);
    try {
      await deleteList(listToDelete);
      toast({
        title: language === "en" ? "List Deleted" : "তালিকা মুছে ফেলা হয়েছে",
        description: language === "en"
          ? "The grocery list has been successfully deleted."
          : "মুদি তালিকাটি সফলভাবে মুছে ফেলা হয়েছে।"
      });
    } catch (error) {
      console.error("Error deleting list:", error);
      toast({
        title: language === "en" ? "Error" : "ত্রুটি",
        description: language === "en"
          ? "Failed to delete list. Please try again."
          : "তালিকা মুছতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
      setListToDelete(null);
    }
  };

  const filteredLists = lists
    .filter(list =>
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.month.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDownloadPdf = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await downloadListAsPdf(id);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getText("listHistory", language)}
          </h1>
          <p className="text-muted-foreground">
            {getText("viewManageLists", language)}
          </p>
        </div>
        <div className="w-full md:w-auto relative">
          <Input
            placeholder={getText("searchLists", language)}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="md:w-[250px] pl-8"
          />
          <Search className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getText("yourGroceryLists", language)}</CardTitle>
          <CardDescription>
            {filteredLists.length} {getText("listsTotal", language)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              {searchTerm ? (
                <>
                  <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground mb-2">
                    {getText("noListsMatch", language)}
                  </p>
                  <Button variant="link" onClick={() => setSearchTerm("")} className="text-orange-600 hover:text-orange-500">
                    {getText("clearSearch", language)}
                  </Button>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground mb-4">
                    {getText("noListsYet", language)}
                  </p>
                  <Button
                    onClick={() => navigate("/create-list")}
                    className="bg-orange-600 hover:bg-orange-500 text-gray-50"
                  >
                    {getText("createFirstList", language)}
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{getText("listName", language)}</TableHead>
                    <TableHead>{getText("month", language)}</TableHead>
                    <TableHead>{getText("items", language)}</TableHead>
                    <TableHead className="text-right">{getText("estCost", language)}</TableHead>
                    <TableHead className="text-right">{getText("createdOn", language)}</TableHead>
                    <TableHead className="w-[100px] text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLists.map(list => {
                    const createdDate = new Date(list.createdAt);
                    return (
                      <TableRow key={list.id} className="cursor-pointer" onClick={() => navigate(`/edit-list/${list.id}`)}>
                        <TableCell className="font-medium">{list.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {list.month} {list.year}
                          </div>
                        </TableCell>
                        <TableCell>{list.items.length} {getText("items", language)}</TableCell>
                        <TableCell className="text-right">
                          ${list.totalEstimatedPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {createdDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={e => handleDownloadPdf(list.id, e)} className="h-8 px-2">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={e => handleDeleteClick(list.id, e)} className="h-8 px-2 text-red-600 hover:text-red-800">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!listToDelete} onOpenChange={() => setListToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === "en" ? "Are you sure you want to delete this list?" : "আপনি কি নিশ্চিত যে আপনি এই তালিকাটি মুছতে চান?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === "en"
                ? "This action cannot be undone. The grocery list will be permanently deleted."
                : "এই পদক্ষেপটি পূর্বাবস্থায় ফিরিয়ে নেওয়া যাবে না। মুদি তালিকাটি স্থায়ীভাবে মুছে ফেলা হবে।"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              {language === "en" ? "Cancel" : "বাতিল"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting} className="bg-red-600 text-white hover:text-white hover:bg-red-600">
              {isDeleting ? getText("deleting", language) + "..." : getText("delete", language)}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default ListHistory;
