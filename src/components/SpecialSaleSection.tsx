import { motion } from "framer-motion";
import { ShoppingBag, Flame } from "lucide-react";
import { Product } from "./ProductCard";
import { useState } from "react";

interface SaleProduct extends Product {
  salePrice?: number;
}

interface SpecialSaleSectionProps {
  products: SaleProduct[];
  onAddToCart: (product: Product) => void;
}

const SaleCard = ({ product, onAddToCart, index }: { product: SaleProduct; onAddToCart: (p: Product) => void; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-card shadow-warm hover:shadow-warm-lg transition-shadow duration-400">
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-destructive text-destructive-foreground text-xs font-body font-bold rounded-md flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {discount}% OFF
          </div>
        )}
        <div className="aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
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
          className="absolute inset-0 bg-foreground/10 items-center justify-center flex"
        >
          <button
            onClick={() => onAddToCart({ ...product, price: product.salePrice || product.price })}
            className="p-2.5 bg-card rounded-full shadow-warm-lg hover:scale-110 transition-transform"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 text-foreground" />
          </button>
        </motion.div>
      </div>
      <div className="mt-2.5 text-center">
        <h3 className="font-heading text-sm sm:text-base text-foreground">{product.name}</h3>
        <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-center gap-2 mt-1">
          <p className="font-heading text-sm sm:text-base text-destructive">PKR {(product.salePrice || product.price).toLocaleString()}</p>
          {product.salePrice && (
            <p className="font-body text-xs text-muted-foreground line-through">PKR {product.price.toLocaleString()}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SpecialSaleSection = ({ products, onAddToCart }: SpecialSaleSectionProps) => {
  if (products.length === 0) return null;

  return (
    <section id="special-sale" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl bg-destructive/5 rounded-xl p-6 sm:p-8 border border-destructive/20 shadow-warm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 sm:mb-3 text-destructive font-body font-medium flex items-center justify-center gap-2">
            <Flame className="w-4 h-4" /> Limited Time <Flame className="w-4 h-4" />
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4 italic text-foreground">
            Special Sale
          </h2>
          <div className="w-16 h-px bg-destructive mx-auto mb-3 sm:mb-4" />
          <p className="font-body text-sm sm:text-base max-w-lg mx-auto text-muted-foreground">
            Grab these amazing deals before they're gone!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {products.map((product, i) => (
            <SaleCard key={product.id} product={product} onAddToCart={onAddToCart} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialSaleSection;
