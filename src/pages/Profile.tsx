import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGrocery } from "@/contexts/GroceryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getText } from "@/utils/translations";
import { formatCurrency } from "@/utils/currency";
import { KeyRound, ShoppingCart, Package, Wallet, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { lists } = useGrocery();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isEnglish = language === "en";

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "Not available";
  const userInitial = userName.charAt(0).toUpperCase();
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(isEnglish ? "en-US" : "bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    : "N/A";

  // Calculate stats
  const totalLists = lists.length;
  const totalItems = lists.reduce((count, list) => count + list.items.length, 0);
  const totalSpent = lists.reduce((total, list) => total + list.totalEstimatedPrice, 0);

  return (
    <DashboardLayout>
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-left">
              {getText("profilePageTitle", language)}
            </h1>
            <p className="text-muted-foreground text-left">
              {getText("accountInfo", language)}
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="card-gradient mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-orange-500/20">
                <AvatarFallback className="bg-orange-100 text-orange-600 text-3xl font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-muted-foreground">{userEmail}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground justify-center sm:justify-start">
                  <Calendar className="h-4 w-4" />
                  <span>{getText("memberSince", language)}: {memberSince}</span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate("/reset-password")}
                className="mt-4 sm:mt-0"
              >
                <KeyRound className="mr-2 h-4 w-4" />
                {getText("changePassword", language)}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                {getText("totalListsCreated", language)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">{totalLists}</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {getText("totalItemsAdded", language)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">{totalItems}</p>
            </CardContent>
          </Card>

          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                {getText("totalAmountSpent", language)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-500">
                {formatCurrency(totalSpent, "BDT")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
