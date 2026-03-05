import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index: number;
}

const ProductCard = ({ product, onAddToCart, index }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-lg bg-card shadow-warm hover:shadow-warm-lg transition-shadow duration-400 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-foreground/10 items-center justify-center flex flex-row"
        >
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="p-2.5 bg-card rounded-full shadow-warm-lg hover:scale-110 transition-transform"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 text-foreground" />
          </button>
        </motion.div>

        {/* Expand indicator */}
        <div className="absolute bottom-1.5 right-1.5 p-1 bg-card/80 rounded-full">
          {expanded ? (
            <ChevronUp className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="mt-2.5 text-center">
        <h3 className="font-heading text-sm sm:text-base text-foreground">{product.name}</h3>
        <p className="font-heading text-sm sm:text-base text-primary mt-1">PKR {product.price.toLocaleString()}</p>
      </div>

      {/* Inline slide-down detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 bg-card rounded-lg border border-border shadow-warm">
              <div className="flex gap-3 items-start">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1">Details</p>
                  <p className="font-body text-xs sm:text-sm text-foreground leading-relaxed">
                    {product.description || `Premium handcrafted ${product.category === "painting" ? "artwork on high-quality canvas" : "piece using finest yarn & materials"}.`}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                <p className="font-heading text-base text-primary">PKR {product.price.toLocaleString()}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); setExpanded(false); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground font-body text-xs rounded-lg hover:opacity-90 transition-all shadow-warm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;
