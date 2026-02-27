import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout?: () => void;
}

const CartDrawer = ({ open, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card z-50 shadow-warm-lg flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-xl text-foreground">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mb-4" />
                  <p className="font-heading text-lg text-muted-foreground">Your cart is empty</p>
                  <p className="font-body text-sm text-muted-foreground mt-1">Explore our collections to find something you love</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-sm" />
                    <div className="flex-1">
                      <h3 className="font-heading text-sm text-foreground">{item.product.name}</h3>
                      <p className="font-body text-sm text-gold mt-1">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="p-1 hover:bg-secondary rounded transition-colors">
                          <Minus className="w-3 h-3 text-foreground" />
                        </button>
                        <span className="font-body text-sm text-foreground">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="p-1 hover:bg-secondary rounded transition-colors">
                          <Plus className="w-3 h-3 text-foreground" />
                        </button>
                        <button onClick={() => onRemove(item.product.id)} className="ml-auto font-body text-xs text-muted-foreground hover:text-destructive transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between">
                  <span className="font-body text-muted-foreground">Total</span>
                  <span className="font-heading text-xl text-foreground">${total.toFixed(2)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
