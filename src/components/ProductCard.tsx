import { motion } from "framer-motion";
import { ShoppingBag, Eye } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-sm bg-card shadow-warm">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-foreground/20 flex items-center justify-center gap-3"
        >
          <button
            onClick={() => onAddToCart(product)}
            className="p-3 bg-card rounded-full shadow-warm-lg hover:scale-110 transition-transform"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
          </button>
          <button className="p-3 bg-card rounded-full shadow-warm-lg hover:scale-110 transition-transform" aria-label="Quick view">
            <Eye className="w-5 h-5 text-foreground" />
          </button>
        </motion.div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-heading text-lg text-foreground">{product.name}</h3>
        <p className="font-body text-sm text-muted-foreground mt-1">{product.description}</p>
        <p className="font-heading text-lg text-gold mt-2">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
