import { motion } from "framer-motion";
import ProductCard, { Product } from "./ProductCard";

interface BestSellingSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const BestSellingSection = ({ products, onAddToCart }: BestSellingSectionProps) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-section-alt bg-destructive">
      <div className="container mx-auto max-w-6xl bg-[#a9824c]/[0.37]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14">

          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 sm:mb-3 my-0 mx-[22px] py-[2px] text-[#986d52] text-center font-medium">CUSTOMER FAVORITES

          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 italic bg-[#8f755b]/[0.69] my-[22px] mx-[33px]">
            Best Sellers
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-3 sm:mb-4" />
          <p className="font-body text-sm sm:text-base max-w-lg mx-auto text-secondary-foreground">
            The pieces our customers can't stop raving about
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) =>
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} index={i} />
          )}
        </div>
      </div>
    </section>);

};

export default BestSellingSection;