import { motion } from "framer-motion";
import ProductCard, { Product } from "./ProductCard";

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductSection = ({ id, title, subtitle, products, onAddToCart }: ProductSectionProps) => {
  return (
    <section id={id} className="sm:py-20 md:py-24 sm:px-6 bg-primary-foreground px-[16px] py-[44px] border-primary-foreground">
      <div className="container mx-auto max-w-6xl border-primary bg-[#a9824c]/[0.47]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14">

          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 sm:mb-3 my-[2px] mx-[22px] py-[2px] text-center font-sans font-bold text-[#986d52]">
            Collection
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4 italic text-secondary-foreground bg-[#8f755b]/[0.49] py-[2px] mx-[23px]">
            {title}
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-3 sm:mb-4" />
          <p className="font-body text-sm sm:text-base max-w-lg mx-auto text-secondary-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product, i) =>
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} index={i} />
          )}
        </div>
      </div>
    </section>);

};

export default ProductSection;