import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="font-heading text-xl md:text-2xl font-semibold text-foreground tracking-wide">
          Hafsa's Art World
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {["paintings", "crochet", "custom"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={onCartClick} className="relative p-2">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col items-center py-4 gap-4">
              {["paintings", "crochet", "custom"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollTo(s)}
                  className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
