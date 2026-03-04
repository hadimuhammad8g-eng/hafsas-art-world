import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
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
    <Drawer open={open} onOpenChange={(v) => !v && onClose()}>
      <DrawerContent className="max-h-[70vh]">
        <div className="mx-auto w-full max-w-lg px-4 pb-6">
          <DrawerHeader className="px-0 pt-2 pb-3">
            <DrawerTitle className="font-heading text-lg text-foreground">{product.name}</DrawerTitle>
            <DrawerDescription className="font-body text-sm text-muted-foreground">
              {product.description || "Handcrafted with love and care."}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex gap-4 items-start">
            <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Quality</p>
                <p className="font-body text-sm text-foreground">
                  Premium handcrafted {product.category === "painting" ? "artwork on high-quality canvas" : "piece using finest yarn & materials"}.
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <p className="font-heading text-xl text-primary">PKR {product.price.toLocaleString()}</p>
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-body text-sm rounded-lg hover:opacity-90 transition-all shadow-warm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductDetailDialog;
