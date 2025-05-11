import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getText } from "@/utils/translations";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 font-inter">
      <div className="flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 xl:p-24">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground bg-orange-600">
                <User size={16} />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">Bazar Buddy</h1>
            </div>
            <h1 className="text-2xl font-bold">{getText("loginToAccount", language)}</h1>
            <p className="text-muted-foreground">
              {getText("enterEmail", language)}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{getText("email", language)}</Label>
              <Input
                id="email"
                placeholder="me@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{getText("password", language)}</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-orange-600"
                >
                  {getText("forgotPassword", language)}
                </Link>
              </div>
              <Input
                id="password"
                placeholder="enter your password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-500 text-zinc-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                getText("login", language)
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            {getText("dontHaveAccount", language)}{" "}
            <Link to="/register" className="text-orange-600 hover:underline">
              {getText("signUp", language)}
            </Link>
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="text-center text-sm mt-4">
                Developed by{" "}
                <span className="text-orange-600 hover:underline cursor-pointer">
                  Farhan Shahriyar
                </span>
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col space-y-2">
                <h4 className="text-sm font-semibold">Md.Farhan Shahriyar</h4>
                <p className="text-xs text-muted-foreground">
                  Frontend Developer • Passionate about clean UI and accessible UX.
                </p>
                <a
                  href="https://mdfarhanshahriyar2024.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-600 hover:underline"
                >
                  Visit Portfolio →
                </a>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      <div className="hidden md:block bg-zinc-900 relative overflow-hidden">
        <img
          src="../../public/Loginpage.jpg"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full opacity-50"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex items-center justify-center h-full p-8">
          <h1 className="text-4xl font-bold text-white">Welcome to Bazar Buddy</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
