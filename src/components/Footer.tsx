import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const WHATSAPP_URL = "https://wa.me/923432080769?text=Hi!%20I'm%20interested%20in%20your%20art%20products.";
const INSTAGRAM_URL = "https://www.instagram.com/hafsaarif13?igsh=MXE3YjNxdjJyMGo3cA%3D%3D&utm_source=qr";

const Footer = () => (
  <footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-border bg-footer-bg">
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-center md:text-left">
          <img alt="Logo" className="w-10 h-10 rounded-full object-cover" src={logo} />
          <div>
            <h3 className="font-heading text-xl text-primary-foreground">Hafsa's Art World</h3>
            <p className="font-body text-xs sm:text-sm text-primary-foreground/60">Handcrafted art, made with love</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-body text-xs sm:text-sm transition-colors text-primary-foreground/70 hover:text-primary-foreground">
            Instagram
          </a>
          <a href="#" className="font-body text-xs sm:text-sm transition-colors text-primary-foreground/70 hover:text-primary-foreground">
            Pinterest
          </a>
          <a href="mailto:hadimuhammad8g@gmail.com" className="font-body text-xs sm:text-sm transition-colors text-primary-foreground/70 hover:text-primary-foreground">
            Email
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white font-body text-xs sm:text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-body text-xs flex items-center gap-1 text-primary-foreground/60">
          Made with <Heart className="w-3 h-3 text-secondary fill-secondary" /> © 2026 Hafsa's Art World
        </p>
        <Link to="/admin/login" className="font-body text-xs text-primary-foreground/30 hover:text-primary-foreground/50 transition-colors">
          Add Products
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
