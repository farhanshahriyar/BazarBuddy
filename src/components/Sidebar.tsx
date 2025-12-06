
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  ListMusic,
  LogOut,
  Menu,
  X,
  User,
  DollarSign,
  Settings2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { getText } from "@/utils/translations";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  const onLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const sidebarLinks = [
    {
      name: getText("dashboard", language),
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: getText("createList", language),
      href: "/create-list",
      icon: <PlusCircle size={18} />,
    },
    {
      name: getText("history", language),
      href: "/list-history",
      icon: <ListMusic size={18} />,
    },
  ];

  // Shared Sidebar Content component
  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col border-r bg-sidebar">
      <div className="flex items-center gap-2 px-4 py-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground bg-orange-600">
          <User size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-left text-sidebar-foreground">BazarBuddy</span>
          <span className="text-xs text-sidebar-foreground/60">Family Grocery management</span>
        </div>
      </div>
      <Separator />
      <nav className="px-2 py-2 space-y-1">
        {sidebarLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              navigate(link.href);
              setOpen(false);
            }}
            className={cn(
              "sidebar-item flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors",
              location.pathname === link.href && "bg-muted text-primary"
            )}
          >
            {link.icon}
            <span className={isMobile ? "" : "hidden sm:inline"}>{link.name}</span>
          </a>
        ))}
      </nav>
      <div className="mt-auto p-2.5 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-sidebar-foreground">{userInitial}</AvatarFallback>
              </Avatar>
              <div className={cn("flex-col", isMobile ? "flex" : "hidden sm:flex")}>
                <span className="text-sm font-medium text-sidebar-foreground">{userName}</span>
                <span className="text-xs text-sidebar-foreground/60 text-left">Free User</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="start">
            <DropdownMenuItem onClick={() => navigate("/billing")} disabled={true}>
              <DollarSign className="mr-2 h-4 w-4" />
              <p className="text-sm font-medium text-sidebar-foreground">
                {getText("billing", language) || "Billing"}
              </p>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings2Icon className="mr-2 h-4 w-4" />
              <p className="text-sm font-medium text-sidebar-foreground">
                {getText("settings", language) || "Settings"}
              </p>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <p className="text-sm font-medium text-sidebar-foreground">
                {getText("profile", language) || "Profile"}
              </p>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {getText("logout", language) || "Logout"}
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar - fixed on left side */}
      <div className={cn("hidden md:flex h-screen w-64 flex-col fixed top-0 left-0 z-30", className)}>
        <SidebarContent />
      </div>

      {/* Mobile Header + Sheet - fixed at top */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background">
        <div className="flex h-16 items-center gap-4 border-b px-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              {/* <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close sidebar</span>
              </Button> */}
              <SidebarContent isMobile={true} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center text-primary-foreground rounded-2xl bg-orange-600">
              <User size={16} />
            </div>
            <span className="text-lg font-semibold tracking-tight">BazarBuddy</span>
          </div>
        </div>
      </div>
    </>
  );
}
