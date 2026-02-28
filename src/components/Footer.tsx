import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-border bg-section-alt">
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-center md:text-left">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="font-heading text-xl text-foreground">Hafsa's Art World</h3>
            <p className="font-body text-xs sm:text-sm text-muted-foreground">Handcrafted art, made with love</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {["Instagram", "Pinterest", "Email"].map((label) => (
            <a key={label} href="#" className="font-body text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-body text-xs text-muted-foreground flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-accent fill-accent" /> © 2026 Hafsa's Art World
        </p>
        <Link to="/admin/login" className="font-body text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          Admin
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
