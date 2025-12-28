import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGrocery } from "@/contexts/GroceryContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getText } from "@/utils/translations";
import { toast } from "@/components/ui/use-toast";
import { Languages, History, MessageSquare, Send, Loader2, Download, ArrowDownToLine } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { language } = useLanguage();
  const { lists } = useGrocery();
  const navigate = useNavigate();
  const isEnglish = language === "en";

  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackDescription, setFeedbackDescription] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedbackType || !feedbackDescription) {
      toast({
        title: isEnglish ? "Missing Information" : "তথ্য অনুপস্থিত",
        description: isEnglish ? "Please fill in all required fields." : "অনুগ্রহ করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন।",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('feedback')
        .insert({
          type: feedbackType,
          description: feedbackDescription,
          email: feedbackEmail || null,
          user_id: user?.id || null
        });

      if (error) throw error;

      toast({
        title: getText("feedbackSuccess", language),
        description: isEnglish ? "We'll review your feedback soon." : "আমরা শীঘ্রই আপনার মতামত পর্যালোচনা করব।"
      });

      setFeedbackType("");
      setFeedbackDescription("");
      setFeedbackEmail("");
    } catch (error: any) {
      console.error("Feedback error:", error);
      toast({
        title: getText("feedbackError", language),
        description: error.message || (isEnglish ? "An unexpected error occurred." : "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-left">
              {getText("settingsPageTitle", language)}
            </h1>
            <p className="text-muted-foreground text-left">
              {isEnglish ? "Manage your preferences" : "আপনার পছন্দগুলি পরিচালনা করুন"}
            </p>
          </div>
        </div>

        {/* Language Preference */}
        <Card className="card-gradient mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center overflow-hidden">
          <CardHeader className="w-full sm:w-auto">
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              {getText("languagePreference", language)}
            </CardTitle>
            <CardDescription className="text-left">
              {isEnglish ? "Choose your preferred language" : "আপনার পছন্দের ভাষা নির্বাচন করুন"}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full sm:w-auto pb-6 sm:pb-0 sm:pr-6">
            <LanguageSwitcher />
          </CardContent>
        </Card>

        {/* Download Full Report */}
        <Card className="card-gradient mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center overflow-hidden">
          <CardHeader className="w-full sm:w-auto">
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              {getText("downloadFullReport", language)}
            </CardTitle>
            <CardDescription className="text-left">
              {getText("downloadFullReportDesc", language)}
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full sm:w-auto pb-6 sm:pb-0 sm:pr-6">
            <Button
              onClick={() => navigate("/full-report-preview")}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white"
              disabled={lists.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              {isEnglish ? "Preview Report" : "রিপোর্ট প্রিভিউ"}
            </Button>
          </CardContent>
        </Card>

        {/* Support/Feedback Form */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {getText("supportForm", language)}
            </CardTitle>
            <CardDescription className="text-left">
              {isEnglish ? "Share your feedback or report issues" : "আপনার মতামত শেয়ার করুন বা সমস্যা রিপোর্ট করুন"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="space-y-2 text-left">
                <Label htmlFor="feedbackType">{getText("feedbackType", language)} *</Label>
                <Select value={feedbackType} onValueChange={setFeedbackType}>
                  <SelectTrigger id="feedbackType">
                    <SelectValue placeholder={getText("selectFeedbackType", language)} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">{getText("bugReport", language)}</SelectItem>
                    <SelectItem value="feature">{getText("featureRequest", language)}</SelectItem>
                    <SelectItem value="general">{getText("generalFeedback", language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="feedbackEmail">{getText("email", language)}</Label>
                <Input
                  id="feedbackEmail"
                  type="email"
                  placeholder={isEnglish ? "your@email.com (optional)" : "আপনার@ইমেইল.কম (ঐচ্ছিক)"}
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="feedbackDescription">{getText("feedbackDescription", language)} *</Label>
                <Textarea
                  id="feedbackDescription"
                  placeholder={isEnglish ? "Describe your feedback..." : "আপনার মতামত বর্ণনা করুন..."}
                  value={feedbackDescription}
                  onChange={(e) => setFeedbackDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEnglish ? "Submitting..." : "জমা দেওয়া হচ্ছে..."}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {getText("submitFeedback", language)}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
