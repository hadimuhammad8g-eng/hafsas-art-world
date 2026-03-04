import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Product } from "@/components/ProductCard";
import { ShoppingBag } from "lucide-react";

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailDialog = ({ product, open, onClose, onAddToCart }: ProductDetailDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-xl border-border">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 space-y-3">
          <DialogHeader className="space-y-1">
            <DialogTitle className="font-heading text-lg text-foreground">{product.name}</DialogTitle>
            <DialogDescription className="font-body text-sm text-muted-foreground">
              {product.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Quality</p>
            <p className="font-body text-sm text-foreground">
              Premium handcrafted {product.category === "painting" ? "artwork on high-quality canvas" : "piece using finest yarn & materials"}. Each item is unique and made with care.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="font-heading text-xl text-primary">PKR {product.price.toLocaleString()}</p>
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-body text-sm rounded-lg hover:opacity-90 transition-all shadow-warm"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
