
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

  // User Menu Dropdown Component
  const UserMenu = ({ showDetails = true }: { showDetails?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar className="h-9 w-9 border-2 border-orange-500/20">
            <AvatarFallback className="bg-primary/10 text-sidebar-foreground font-semibold">{userInitial}</AvatarFallback>
          </Avatar>
          {showDetails && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">{userName}</span>
              <span className="text-xs text-sidebar-foreground/60 text-left">Free User</span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2" align="end" sideOffset={8}>
        <div className="flex items-center gap-3 p-2 px-3 mb-1 bg-muted/50 rounded-t-md">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-orange-100 text-orange-600 font-bold text-lg">{userInitial}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-sidebar-foreground truncate">{userName}</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Free User</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/billing")} disabled={true} className="focus:bg-orange-50 focus:text-orange-950 cursor-pointer py-2.5">
          <DollarSign className="mr-3 h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">
            {getText("billing", language) || "Billing"}
          </p>
          <DropdownMenuShortcut className="ml-auto opacity-50">⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")} className="focus:bg-orange-50 focus:text-orange-950 cursor-pointer py-2.5">
          <Settings2Icon className="mr-3 h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">
            {getText("settings", language) || "Settings"}
          </p>
          <DropdownMenuShortcut className="ml-auto opacity-50">⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/profile")} className="focus:bg-orange-50 focus:text-orange-950 cursor-pointer py-2.5">
          <User className="mr-3 h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">
            {getText("profile", language) || "Profile"}
          </p>
          <DropdownMenuShortcut className="ml-auto opacity-50">⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="focus:bg-red-50 focus:text-red-600 text-red-500 cursor-pointer py-2.5">
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-semibold">{getText("logout", language) || "Logout"}</span>
          <DropdownMenuShortcut className="ml-auto opacity-50 text-red-400">⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
        <UserMenu showDetails={!(!isMobile && false)} /> {/* Logic to show details if not collapsed or on mobile */}
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-orange-50">
                  <Menu className="h-6 w-6 text-orange-600" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 border-r-orange-100">
                <SidebarContent isMobile={true} />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center text-primary-foreground rounded-2xl bg-orange-600">
                <User size={16} />
              </div>
              <span className="text-lg font-bold tracking-tight text-orange-600">BazarBuddy</span>
            </div>
          </div>

          <div className="flex items-center">
            <UserMenu showDetails={false} />
          </div>
        </div>
      </div>
    </>
  );
}
