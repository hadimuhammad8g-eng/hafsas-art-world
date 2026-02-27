import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely stunning painting! The colors are even more beautiful in person. Hafsa is incredibly talented.",
    product: "Golden Bloom",
  },
  {
    name: "Amina K.",
    rating: 5,
    text: "The crochet bear I ordered for my daughter was perfect. Such fine craftsmanship and so soft!",
    product: "Cozy Bear",
  },
  {
    name: "Fatima R.",
    rating: 5,
    text: "I ordered a custom painting and it exceeded all expectations. Will definitely order again!",
    product: "Custom Order",
  },
  {
    name: "Zara A.",
    rating: 5,
    text: "The daisy blanket is gorgeous. It's now the centerpiece of my living room. Thank you Hafsa!",
    product: "Daisy Blanket",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-2 sm:mb-3">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 italic">
            What Our Customers Say
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card rounded-lg p-5 sm:p-6 shadow-warm hover:shadow-warm-lg transition-shadow duration-300"
            >
              <Quote className="w-6 h-6 text-gold mb-3 opacity-60" />
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                "{review.text}"
              </p>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>
              <p className="font-heading text-sm font-semibold text-foreground">{review.name}</p>
              <p className="font-body text-xs text-muted-foreground">{review.product}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
