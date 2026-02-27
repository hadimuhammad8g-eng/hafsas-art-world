import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
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
        <div className="aspect-square overflow-hidden">
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
          className="absolute inset-0 bg-foreground/10 flex items-center justify-center"
        >
          <button
            onClick={() => onAddToCart(product)}
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
        <p className="font-heading text-sm sm:text-base text-primary mt-1">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
