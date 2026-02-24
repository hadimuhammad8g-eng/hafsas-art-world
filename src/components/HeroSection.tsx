import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Art studio" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4"
        >
          Handcrafted with Love
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Hafsa's Art World
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-body text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Where creativity meets craftsmanship — discover unique paintings, crochet pieces, and custom-made art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo("paintings")}
            className="px-8 py-3.5 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
          >
            Explore Collection
          </button>
          <button
            onClick={() => scrollTo("custom")}
            className="px-8 py-3.5 border border-foreground/20 text-foreground font-body text-sm uppercase tracking-widest rounded-sm hover:bg-secondary transition-colors"
          >
            Custom Order
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border-2 border-foreground/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1 rounded-full bg-foreground/50"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
