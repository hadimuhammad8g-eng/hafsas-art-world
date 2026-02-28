import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () =>
<footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-border bg-section-alt text-primary-foreground bg-[#90734c]">
    <div className="container mx-auto max-w-6xl bg-[#b67649]/[0.71]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-center md:text-left">
          <img alt="Logo" className="w-10 h-10 rounded-full object-cover" src="/lovable-uploads/42c89b50-1c40-4235-bbbb-adc302d9e160.jpg" />
          <div>
            <h3 className="font-heading text-xl text-foreground">Hafsa's Art World</h3>
            <p className="font-body text-xs sm:text-sm text-neutral-900/[0.89]">Handcrafted art, made with love</p>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {["Instagram", "Pinterest", "Email"].map((label) =>
        <a key={label} href="#" className="font-body text-xs sm:text-sm transition-colors text-black/85">
              {label}
            </a>
        )}
        </div>
      </div>
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-body text-xs flex items-center gap-1 text-[#1f1e1e]/[0.92] bg-[#b67154]/[0.22]">
          Made with <Heart className="w-3 h-3 text-accent fill-accent" /> © 2026 Hafsa's Art World
        </p>
        <Link to="/admin/login" className="font-body text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          Admin
        </Link>
      </div>
    </div>
  </footer>;


export default Footer;