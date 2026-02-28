import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import BestSellingSection from "@/components/BestSellingSection";
import CustomerReviews from "@/components/CustomerReviews";
import CustomOrderSection from "@/components/CustomOrderSection";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import FloatingFlowers from "@/components/FloatingFlowers";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "sonner";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const { data: productData } = useProducts();

  const paintings = productData?.paintings ?? [];
  const crochetItems = productData?.crochetItems ?? [];
  const bestSellers = productData?.bestSellers ?? [];

  const addToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = useCallback(() => {
    setCartOpen(false);
    navigate("/checkout", { state: { items: cartItems } });
  }, [cartItems, navigate]);

  return (
    <div className="min-h-screen bg-page-pattern">
      <FloatingFlowers />
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />

      <BestSellingSection products={bestSellers} onAddToCart={addToCart} />

      <ProductSection
        id="paintings"
        title="Paintings"
        subtitle="Original artworks that bring warmth and beauty to any space"
        products={paintings}
        onAddToCart={addToCart}
      />

      <ProductSection
        id="crochet"
        title="Crochet"
        subtitle="Lovingly handcrafted pieces for cozy living"
        products={crochetItems}
        onAddToCart={addToCart}
      />

      <CustomerReviews />
      <CustomOrderSection />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
