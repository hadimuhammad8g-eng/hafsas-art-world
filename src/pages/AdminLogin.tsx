import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Lock, UserPlus } from "lucide-react";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    const saved = localStorage.getItem("admin_email");
    if (saved) return true;
    return false;
  });

  useState(() => {
    const savedEmail = localStorage.getItem("admin_email");
    const savedPass = localStorage.getItem("admin_pass");
    if (savedEmail) setEmail(savedEmail);
    if (savedPass) setPassword(savedPass);
  });
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (isSignUp) {
      const { error: err } = await signUp(email, password);
      setLoading(false);
      if (err) {
        setError(err);
      } else {
        setError("");
        setIsSignUp(false);
        // Show success message
        setError("Account created! Please check your email to verify, then sign in.");
      }
    } else {
      const { error: err } = await signIn(email, password);
      setLoading(false);
      if (err) {
        setError(err);
      } else {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen bg-page-pattern flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card rounded-xl p-8 shadow-warm-lg border border-border"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="w-16 h-16 mx-auto rounded-full object-cover mb-4 border-2 border-secondary" />
          <h1 className="font-heading text-2xl text-foreground italic">{isSignUp ? "Create Admin Account" : "Admin Login"}</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {isSignUp ? "Sign up to manage your products" : "Sign in to manage your products"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className={`p-3 border rounded-lg text-sm font-body ${error.includes("created") ? "bg-green-50 border-green-200 text-green-700" : "bg-destructive/10 border-destructive/20 text-destructive"}`}>
              {error}
            </div>
          )}
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="arifhafsa466@gmail.com"
            />
          </div>
          <div>
            <label className="font-body text-xs text-muted-foreground block mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-warm"
          >
            {isSignUp ? <UserPlus className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            {loading ? (isSignUp ? "Creating..." : "Signing in...") : (isSignUp ? "Create Account" : "Sign In")}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
          className="w-full mt-3 font-body text-xs text-primary hover:text-primary/80 transition-colors text-center"
        >
          {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          ← Back to Shop
        </button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
