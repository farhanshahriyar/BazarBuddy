import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Eye, EyeOff } from "lucide-react";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register
  } = useAuth();
  const navigate = useNavigate();
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
      const success = await register(name, email, password);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen grid md:grid-cols-2">
    <div className="flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 xl:p-24">
      <div className="mx-auto w-full max-w-sm space-y-6">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground bg-orange-600">
              <User size={16} />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Bazar Buddy</h1>
          </div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-left block">Full Name</Label>
            <Input id="name" placeholder="Md. Farhan Shahriyar" required value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-left block">Email</Label>
            <Input id="email" placeholder="me@example.com" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-left block">Password</Label>
            <div className="relative">
              <Input id="password" required type={showPassword ? "text" : "password"} placeholder="******" value={password} onChange={e => {
                setPassword(e.target.value);
                if (confirmPassword) validatePasswords();
              }} className="pr-10" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-left block">Confirm Password</Label>
            <div className="relative">
              <Input id="confirm-password" required type={showConfirmPassword ? "text" : "password"} placeholder="******" value={confirmPassword} onChange={e => {
                setConfirmPassword(e.target.value);
                if (password) validatePasswords();
              }} className="pr-10" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordError && <p className="text-sm text-white bg-red-500 p-1 mt-1 rounded">{passwordError}</p>}
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50">
            {isSubmitting ? <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account
            </> : "Register"}
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
    <div className="hidden md:block bg-zinc-900 relative overflow-hidden">
      <img src="https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJS6BCcddyNTEA0PDgHOpmwL5tZIRnBlWrN84QC" alt="Background" className="absolute inset-0 object-cover w-full h-full opacity-50" />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative flex items-center justify-center h-full p-8">
        <h1 className="text-4xl font-bold text-white">Welcome to Bazar Buddy</h1>
      </div>
    </div>
  </div>;
};
export default Register;