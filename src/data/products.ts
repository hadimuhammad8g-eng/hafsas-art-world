import painting1 from "@/assets/painting1.jpg";
import painting2 from "@/assets/painting2.jpg";
import painting3 from "@/assets/painting3.jpg";
import crochet1 from "@/assets/crochet1.jpg";
import crochet2 from "@/assets/crochet2.jpg";
import crochet3 from "@/assets/crochet3.jpg";
import { Product } from "@/components/ProductCard";

export const paintings: Product[] = [
  { id: "p1", name: "Golden Bloom", price: 120, image: painting1, category: "painting", description: "Floral abstract in warm gold tones" },
  { id: "p2", name: "Mountain Sunset", price: 150, image: painting2, category: "painting", description: "Serene landscape at golden hour" },
  { id: "p3", name: "Elegance", price: 200, image: painting3, category: "painting", description: "Classical portrait in warm palette" },
  { id: "p4", name: "Amber Fields", price: 135, image: painting1, category: "painting", description: "Rolling hills in autumn amber" },
  { id: "p5", name: "Desert Rose", price: 175, image: painting2, category: "painting", description: "Warm desert tones at dusk" },
  { id: "p6", name: "Sienna Dreams", price: 160, image: painting3, category: "painting", description: "Rich earthy abstract composition" },
  { id: "p7", name: "Gilded Horizon", price: 190, image: painting1, category: "painting", description: "Sunset over calm waters" },
  { id: "p8", name: "Terracotta Muse", price: 145, image: painting2, category: "painting", description: "Warm-toned figure study" },
];

export const crochetItems: Product[] = [
  { id: "c1", name: "Cozy Bear", price: 45, image: crochet1, category: "crochet", description: "Handmade amigurumi teddy bear" },
  { id: "c2", name: "Daisy Blanket", price: 85, image: crochet2, category: "crochet", description: "Soft floral pattern throw blanket" },
  { id: "c3", name: "Flower Bouquet", price: 55, image: crochet3, category: "crochet", description: "Everlasting crochet flower arrangement" },
  { id: "c4", name: "Baby Booties", price: 30, image: crochet1, category: "crochet", description: "Tiny handmade booties for newborns" },
  { id: "c5", name: "Autumn Scarf", price: 65, image: crochet2, category: "crochet", description: "Warm chunky knit scarf" },
  { id: "c6", name: "Pumpkin Set", price: 40, image: crochet3, category: "crochet", description: "Decorative crochet pumpkins trio" },
  { id: "c7", name: "Market Bag", price: 38, image: crochet1, category: "crochet", description: "Reusable crochet shopping tote" },
  { id: "c8", name: "Bunny Plush", price: 48, image: crochet2, category: "crochet", description: "Adorable stuffed bunny toy" },
];

export const bestSellers: Product[] = [
  { id: "b1", name: "Golden Bloom", price: 120, image: painting1, category: "painting", description: "Our #1 best-selling painting" },
  { id: "b2", name: "Cozy Bear", price: 45, image: crochet1, category: "crochet", description: "Most loved amigurumi" },
  { id: "b3", name: "Daisy Blanket", price: 85, image: crochet2, category: "crochet", description: "Customer favorite blanket" },
  { id: "b4", name: "Elegance", price: 200, image: painting3, category: "painting", description: "Top-rated portrait piece" },
];
