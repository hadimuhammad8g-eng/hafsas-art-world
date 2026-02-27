import { motion } from "framer-motion";
import ProductCard, { Product } from "./ProductCard";

interface BestSellingSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const BestSellingSection = ({ products, onAddToCart }: BestSellingSectionProps) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-section-alt">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2 sm:mb-3">
            Customer Favorites
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 italic">
            Best Sellers
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-3 sm:mb-4" />
          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            The pieces our customers can't stop raving about
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingSection;
