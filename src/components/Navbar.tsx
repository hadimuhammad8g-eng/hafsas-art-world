import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between bg-[#835b3f]/[0.76]">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="Hafsa's Art World Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
          <span className="font-heading text-lg sm:text-xl md:text-2xl font-semibold text-foreground tracking-wide">
            Hafsa's Art World
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["paintings", "crochet", "custom"].map((s) =>
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className="font-body text-xs lg:text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">

              {s}
            </button>
          )}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors">

            <ShoppingBag className="w-5 h-5 text-foreground" />
            {cartCount > 0 &&
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-body">
                {cartCount}
              </span>
            }
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={onCartClick} className="relative p-2">
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {cartCount > 0 &&
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                {cartCount}
              </span>
            }
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-background border-b border-border">

            <div className="flex flex-col items-center py-4 gap-4">
              {["paintings", "crochet", "custom"].map((s) =>
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary">

                  {s}
                </button>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

};

export default Navbar;