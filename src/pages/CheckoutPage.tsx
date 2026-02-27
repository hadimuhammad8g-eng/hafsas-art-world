import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Smartphone, Check } from "lucide-react";
import { CartItem } from "@/components/CartDrawer";
import { toast } from "sonner";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items: CartItem[] = location.state?.items || [];
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const [method, setMethod] = useState<"easypaisa" | "jazzcash" | "bank" | "">("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="font-heading text-2xl text-foreground mb-4">No items in cart</p>
          <button onClick={() => navigate("/")} className="font-body text-sm text-primary underline">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) {
      toast.error("Please select a payment method");
      return;
    }
    setSubmitted(true);
    toast.success("Order placed successfully! We'll contact you shortly.");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-card p-10 rounded-xl shadow-warm-lg max-w-md w-full"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading text-2xl text-foreground mb-3 italic">Order Confirmed!</h2>
          <p className="font-body text-sm text-muted-foreground mb-2">
            Thank you for your order of <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
          </p>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Payment via <span className="capitalize font-semibold text-foreground">{method}</span>. We'll send you payment details on your phone.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-8 italic">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-6"
          >
            {/* Shipping Info */}
            <div className="bg-card rounded-xl p-6 shadow-warm space-y-4">
              <h2 className="font-heading text-lg text-foreground mb-2">Shipping Details</h2>
              <input
                type="text" required placeholder="Full Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <input
                type="tel" required placeholder="Phone Number (03XX-XXXXXXX)" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <input
                type="text" required placeholder="Delivery Address" value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <input
                type="text" required placeholder="City" value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-xl p-6 shadow-warm space-y-4">
              <h2 className="font-heading text-lg text-foreground mb-2">Payment Method</h2>
              
              {[
                { id: "easypaisa" as const, label: "EasyPaisa", desc: "Pay via EasyPaisa mobile wallet", color: "bg-green-600" },
                { id: "jazzcash" as const, label: "JazzCash", desc: "Pay via JazzCash mobile wallet", color: "bg-red-600" },
                { id: "bank" as const, label: "Bank Transfer", desc: "Direct bank account transfer", color: "bg-primary" },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setMethod(pm.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    method === pm.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`w-10 h-10 ${pm.color} rounded-lg flex items-center justify-center`}>
                    {pm.id === "bank" ? (
                      <CreditCard className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-primary-foreground" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-heading text-sm font-semibold text-foreground">{pm.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{pm.desc}</p>
                  </div>
                  {method === pm.id && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-gold"
            >
              Place Order — ${total.toFixed(2)}
            </button>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card rounded-xl p-6 shadow-warm sticky top-24">
              <h2 className="font-heading text-lg text-foreground mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-heading text-sm text-foreground">{item.product.name}</p>
                      <p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body text-sm text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-heading text-lg pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
