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

  return (
    <section id="custom" className="py-24 px-6 bg-warm-gradient">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Made for You
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Custom Orders
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-4" />
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            Have something specific in mind? Tell us your vision and we'll bring it to life.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-sm p-8 md:p-10 shadow-warm space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="font-body text-sm text-muted-foreground block mb-2">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition-all"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="font-body text-sm text-muted-foreground block mb-2">Category</label>
            <select
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition-all"
            >
              <option value="">Select a category</option>
              <option value="painting">Painting</option>
              <option value="crochet">Crochet</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-body text-sm text-muted-foreground block mb-2">Describe Your Vision</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-gold transition-all resize-none"
              placeholder="Tell us about the piece you'd like — size, colors, style, anything that inspires you..."
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full py-3.5 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitted ? (
              <>
                <Check className="w-4 h-4" /> Request Sent!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit Request
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default CustomOrderSection;
