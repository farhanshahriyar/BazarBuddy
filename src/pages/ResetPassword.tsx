
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check if we have a valid session on component mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast({
          title: "Invalid reset link",
          description: "This password reset link is invalid or has expired",
          variant: "destructive",
        });
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Failed to update password",
        description: error.message || "An error occurred while updating your password",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 xl:p-24">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground bg-orange-600">
                <User size={16} />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">Bazar Buddy</h1>
            </div>
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Enter your new password below to secure your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 text-left">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword) validatePasswords();
                }}
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                required
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (password) validatePasswords();
                }}
              />
              {passwordError && (
                <p className="text-sm text-destructive font-medium">{passwordError}</p>
              )}
            </div>
            <Button
              className="w-full bg-orange-600 hover:bg-orange-500 text-zinc-50"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden md:block bg-zinc-900 relative overflow-hidden">
        <img
          src="https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJS6BCcddyNTEA0PDgHOpmwL5tZIRnBlWrN84QC"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full opacity-50"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex items-center justify-center h-full p-8 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-4xl font-bold text-white leading-tight">Secure Your Account</h1>
            <p className="text-zinc-400 text-lg">
              Set a strong password to protect your BazarBuddy data and lists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
