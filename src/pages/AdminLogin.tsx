import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Lock, Check } from "lucide-react";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState(() => localStorage.getItem("admin_email") || "");
  const [password, setPassword] = useState(() => localStorage.getItem("admin_pass") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem("admin_email"));

  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      if (rememberMe) {
        localStorage.setItem("admin_email", email);
        localStorage.setItem("admin_pass", password);
      } else {
        localStorage.removeItem("admin_email");
        localStorage.removeItem("admin_pass");
      }
      navigate("/admin");
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
          <h1 className="font-heading text-2xl text-foreground italic">Admin Login</h1>
          <p className="font-body text-sm text-muted-foreground mt-1">Sign in to manage your products</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 border rounded-lg text-sm font-body bg-destructive/10 border-destructive/20 text-destructive">
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
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${rememberMe ? 'bg-primary border-primary' : 'border-border bg-background'}`}
            >
              {rememberMe && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span className="font-body text-xs text-muted-foreground">Remember me</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-warm"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 font-body text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
        >
          ← Back to Shop
        </button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
