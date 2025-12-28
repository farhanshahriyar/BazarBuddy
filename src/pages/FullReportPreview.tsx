import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGrocery } from "@/contexts/GroceryContext";
import { formatCurrency } from "@/utils/currency";
import { getText } from "@/utils/translations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import html2pdf from "html2pdf.js";
import { toBengaliNumerals } from "@/utils/numbers";
import { ArrowLeft, Download, Loader2 } from "lucide-react";

const FullReportPreview = () => {
    const { lists, isLoading } = useGrocery();
    const { language, isEnglish } = useLanguage();
    const navigate = useNavigate();
    const printRef = useRef<HTMLDivElement>(null);
    const [downloading, setDownloading] = React.useState(false);

    // Calculate summary stats
    const totalLists = lists.length;
    const totalItems = lists.reduce((sum, list) => sum + list.items.length, 0);
    const totalSpent = lists.reduce((sum, list) => sum + list.totalEstimatedPrice, 0);

    const handleDownloadPDF = async () => {
        if (!printRef.current) return;

        setDownloading(true);

        const opt = {
            margin: 0.4,
            filename: `BazarBuddy_Full_Report_${new Date().toISOString().split('T')[0]}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };

        try {
            await html2pdf().set(opt).from(printRef.current).save();
        } finally {
            setDownloading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (lists.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">
                    {isEnglish ? "No grocery lists found." : "কোনো মুদি তালিকা পাওয়া যায়নি।"}
                </p>
                <Button onClick={() => navigate("/settings")} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {isEnglish ? "Back to Settings" : "সেটিংসে ফিরে যান"}
                </Button>
            </div>
        );
    }

    return (
        <div className="p-2 sm:p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;700&display=swap"
            />

            <style>
                {`
          @media print {
            body {
              font-family: 'Noto Sans Bengali', Arial, sans-serif;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            @page {
              size: A4;
              margin: 1cm;
            }
            .no-print {
              display: none !important;
            }
          }
          .report-content {
            font-family: 'Noto Sans Bengali', Arial, sans-serif;
          }
        `}
            </style>

            {/* Action Buttons (no print) */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 no-print">
                <Button onClick={() => navigate("/settings")} variant="outline" className="w-full sm:w-auto">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {isEnglish ? "Back" : "ফিরে যান"}
                </Button>
                <Button
                    onClick={handleDownloadPDF}
                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white"
                    disabled={downloading}
                >
                    {downloading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEnglish ? "Downloading..." : "ডাউনলোড হচ্ছে..."}
                        </>
                    ) : (
                        <>
                            <Download className="mr-2 h-4 w-4" />
                            {isEnglish ? "Download PDF" : "পিডিএফ ডাউনলোড"}
                        </>
                    )}
                </Button>
            </div>

            {/* Report Content */}
            <div ref={printRef} className="report-content bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8 border-b-2 border-orange-500 pb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">
                        BazarBuddy - {isEnglish ? "Full Report" : "সম্পূর্ণ রিপোর্ট"}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500">
                        {isEnglish ? "Generated on" : "তৈরি করা হয়েছে"} {new Date().toLocaleDateString(isEnglish ? 'en-US' : 'bn-BD')}
                    </p>
                </div>

                {/* Summary Card */}
                <div className="bg-orange-50 rounded-lg p-4 sm:p-6 mb-8 border border-orange-200">
                    <h2 className="text-lg sm:text-xl font-semibold text-orange-700 mb-4 sm:mb-6 text-center sm:text-left">
                        {isEnglish ? "Account Summary" : "অ্যাকাউন্ট সারাংশ"}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-center">
                        <div className="p-3 bg-white rounded-xl shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none sm:border-r sm:border-orange-200">
                            <p className="text-2xl font-bold text-orange-600">
                                {isEnglish ? totalLists : toBengaliNumerals(totalLists)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium uppercase tracking-wider">{isEnglish ? "Total Lists" : "মোট তালিকা"}</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none sm:border-r sm:border-orange-200">
                            <p className="text-2xl font-bold text-orange-600">
                                {isEnglish ? totalItems : toBengaliNumerals(totalItems)}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium uppercase tracking-wider">{isEnglish ? "Total Items" : "মোট আইটেম"}</p>
                        </div>
                        <div className="p-3 bg-white rounded-xl shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
                            <p className="text-2xl font-bold text-orange-600">
                                {formatCurrency(totalSpent, 'BDT')}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium uppercase tracking-wider">{isEnglish ? "Total Spent" : "মোট খরচ"}</p>
                        </div>
                    </div>
                </div>

                {/* Each List */}
                {lists.map((list, index) => (
                    <div key={list.id} className="mb-8 page-break-inside-avoid overflow-hidden">
                        <div className="bg-gray-100 rounded-t-xl px-4 py-3 border-l-4 border-orange-500 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight">{list.title}</h3>
                            <p className="text-xs sm:text-sm font-semibold text-orange-600/80 uppercase tracking-widest">{list.month} {list.year}</p>
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-b-xl">
                            <Table className="w-full min-w-[500px] sm:min-w-full">
                                <TableHeader>
                                    <TableRow className="bg-orange-600 hover:bg-orange-600">
                                        <TableHead className="text-white text-left font-bold border-r border-orange-500/30">
                                            {isEnglish ? "Item" : "আইটেম"}
                                        </TableHead>
                                        <TableHead className="text-white text-center font-bold border-r border-orange-500/30">
                                            {isEnglish ? "Qty" : "পরিমাণ"}
                                        </TableHead>
                                        <TableHead className="text-white text-center font-bold border-r border-orange-500/30">
                                            {isEnglish ? "Unit" : "একক"}
                                        </TableHead>
                                        <TableHead className="text-white text-right font-bold">
                                            {isEnglish ? "Price" : "মূল্য"}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {list.items.map((item: any) => (
                                        <TableRow key={item.id} className="hover:bg-gray-50/50">
                                            <TableCell className="border-r border-gray-100 font-medium text-gray-900">{item.name}</TableCell>
                                            <TableCell className="border-r border-gray-100 text-center text-gray-600 font-medium">
                                                {isEnglish ? item.quantity : toBengaliNumerals(item.quantity)}
                                            </TableCell>
                                            <TableCell className="border-r border-gray-100 text-center text-gray-500 text-xs sm:text-sm">{item.unit}</TableCell>
                                            <TableCell className="text-right text-gray-900 font-bold">
                                                {formatCurrency(item.estimatedPrice || 0, 'BDT')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow className="bg-orange-50/50 font-black border-t-2 border-orange-100">
                                        <TableCell colSpan={3} className="text-right border-r border-orange-100 text-gray-700 uppercase tracking-widest text-[10px] sm:text-xs">
                                            {isEnglish ? "Total Amount:" : "মোট পরিমাণ:"}
                                        </TableCell>
                                        <TableCell className="text-right text-orange-600 text-base">
                                            {formatCurrency(list.totalEstimatedPrice, 'BDT')}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div className="text-center text-gray-400 text-sm mt-8 pt-4 border-t">
                    <p>BazarBuddy - {isEnglish ? "Family Grocery Management" : "পারিবারিক মুদি ব্যবস্থাপনা"}</p>
                </div>
            </div>
        </div>
    );
};

export default FullReportPreview;
