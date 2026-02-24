import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border">
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-heading text-xl text-foreground mb-1">Hafsa's Art World</h3>
          <p className="font-body text-sm text-muted-foreground">Handcrafted art, made with love</p>
        </div>
        <div className="flex items-center gap-6">
          {["Instagram", "Pinterest", "Email"].map((label) => (
            <a key={label} href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="font-body text-xs text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-accent fill-accent" /> © 2026 Hafsa's Art World
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
