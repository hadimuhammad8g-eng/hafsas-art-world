import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Art studio" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-hero-gradient opacity-85" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto pt-20">
        <motion.img
          src={logo}
          alt="Hafsa's Art World Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-6 rounded-full shadow-gold object-cover border-2 border-warm-sand"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3 sm:mb-4"
        >
          Handcrafted with Love
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight italic"
        >
          Hafsa's Art World
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-body text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Where creativity meets craftsmanship — discover unique paintings, crochet pieces, and custom-made art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("paintings")}
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-primary text-primary-foreground font-body text-xs sm:text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-gold"
          >
            Explore Collection
          </button>
          <button
            onClick={() => scrollTo("custom")}
            className="px-6 sm:px-8 py-3 sm:py-3.5 border border-primary/30 text-foreground font-body text-xs sm:text-sm uppercase tracking-widest rounded-lg hover:bg-secondary transition-colors"
          >
            Custom Order
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-warm-tan/50 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 rounded-full bg-warm-tan"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
