import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Check } from "lucide-react";

const CustomOrderSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", category: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", category: "", description: "" });
    }, 3000);
  };

  const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm sm:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <section id="custom" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-section-alt">
      <div className="container mx-auto max-w-2xl bg-[#c09b62]/[0.56]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12">

          <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] mb-2 sm:mb-3 my-[2px] py-px text-secondary-foreground">
            Made for You
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 italic">
            Custom Orders
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-3 sm:mb-4" />
          <p className="font-body text-sm sm:text-base max-w-lg mx-auto text-[#0d0d0d]/[0.56]">
            Have something specific in mind? Tell us your vision and we'll bring it to life.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="rounded-xl p-6 sm:p-8 md:p-10 shadow-warm space-y-5 sm:space-y-6 bg-[#bbb1a5]/[0.36]">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div>
              <label className="font-body text-xs sm:text-sm block mb-2 text-[#181816]/[0.78]">Your Name</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} placeholder="Enter your name" />
            </div>
            <div>
              <label className="font-body text-xs sm:text-sm block mb-2 text-[#100f0f]/[0.77]">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <label className="font-body text-xs sm:text-sm block mb-2 text-[#1a1919]/85">Category</label>
            <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClasses}>
              <option value="">Select a category</option>
              <option value="painting">Painting</option>
              <option value="crochet">Crochet</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-body text-xs sm:text-sm block mb-2 text-[#121211]/[0.83]">Describe Your Vision</label>
            <textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClasses} resize-none`} placeholder="Tell us about the piece you'd like — size, colors, style, anything that inspires you..." />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3 sm:py-3.5 bg-primary text-primary-foreground font-body text-xs sm:text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-gold">

            {submitted ? <><Check className="w-4 h-4" /> Request Sent!</> : <><Send className="w-4 h-4" /> Submit Request</>}
          </button>
        </motion.form>
      </div>
    </section>);

};

export default CustomOrderSection;