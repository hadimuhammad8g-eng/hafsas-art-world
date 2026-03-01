import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Lock, UserPlus } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      const { error: err } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (err) {
        setError(err.message);
      } else {
        toast.success("Account created! You can now sign in.");
        setMode("login");
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
          <h1 className="font-heading text-2xl text-foreground italic">
            {mode === "login" ? "Admin Login" : "Create Account"}
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {mode === "login" ? "Sign in to manage your products" : "Sign up for an admin account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive font-body">
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
              placeholder="admin@example.com"
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
            {mode === "login" ? (
              <><Lock className="w-4 h-4" /> {loading ? "Signing in..." : "Sign In"}</>
            ) : (
              <><UserPlus className="w-4 h-4" /> {loading ? "Creating..." : "Sign Up"}</>
            )}
          </button>
        </form>

        <button
          onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
          className="w-full mt-3 font-body text-xs text-primary hover:text-foreground transition-colors text-center"
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
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
