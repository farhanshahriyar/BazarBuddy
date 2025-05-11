// import { useState, FormEvent } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, User } from "lucide-react";
// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     register
//   } = useAuth();
//   const navigate = useNavigate();
//   const validatePasswords = () => {
//     if (password !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//       return false;
//     }
//     if (password.length < 6) {
//       setPasswordError("Password must be at least 6 characters");
//       return false;
//     }
//     setPasswordError("");
//     return true;
//   };
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!validatePasswords()) {
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const success = await register(name, email, password);
//       if (success) {
//         navigate("/dashboard");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return <div className="min-h-screen grid md:grid-cols-2 font-inter">
//       <div className="flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 xl:p-24">
//         <div className="mx-auto w-full max-w-sm space-y-6">
//           <div className="space-y-2 text-left">
//             <div className="flex items-center gap-2 mb-6">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground bg-orange-600">
//                 <User size={16} />
//               </div>
//               <h1 className="text-xl font-semibold tracking-tight">Bazar Buddy</h1>
//             </div>
//             <h1 className="text-2xl font-bold">Create an account</h1>
//             <p className="text-muted-foreground">
//               Enter your information to create an account
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input id="name" placeholder="Md.Farhan Shahriyar" required value={name} onChange={e => setName(e.target.value)} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" placeholder="me@example.com" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input id="password" required type="password" value={password} onChange={e => {
//               setPassword(e.target.value);
//               if (confirmPassword) validatePasswords();
//             }} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirm-password">Confirm Password</Label>
//               <Input id="confirm-password" required type="password" value={confirmPassword} onChange={e => {
//               setConfirmPassword(e.target.value);
//               if (password) validatePasswords();
//             }} />
//               {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
//             </div>
//             <Button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50">
//               {isSubmitting ? <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating account
//                 </> : "Register"}
//             </Button>
//           </form>
//           <div className="text-center text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-orange-600 hover:underline">
//               Login
//             </Link>
//           </div>
//         </div>
//          <div className="text-center text-sm">
//             Developed by{" "}
//             <Link to="/login" className="text-orange-600 hover:underline">
//               Login
//             </Link>
//           </div>
//       </div>
//       <div className="hidden md:block bg-zinc-900 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0"></div>
//       </div>
//     </div>;
// };
// export default Register;


import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
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

  return (
    <div className="min-h-screen grid md:grid-cols-2 font-inter">
      <div className="flex flex-col justify-center items-start p-8 md:p-12 lg:p-16 xl:p-24">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-foreground bg-orange-600">
                <User size={16} />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">
                Bazar Buddy
              </h1>
            </div>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Md.Farhan Shahriyar"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword) validatePasswords();
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                required
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (password) validatePasswords();
                }}
              />
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-500 text-gray-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 hover:underline">
              Login
            </Link>
          </div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="text-center text-sm mt-5">
                Developed by{" "}
                <span className="text-orange-600 hover:underline cursor-pointer">
                  Farhan Shahriyar
                </span>
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex flex-col space-y-2">
                <h4 className="text-sm font-semibold">Farhan Shahriyar</h4>
                <p className="text-xs text-muted-foreground">
                  Softwares Developer • Passionate about crafting clean UIs and intuitive UX.
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0"></div>
      </div>
    </div>
  );
};

export default Register;
