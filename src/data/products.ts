import painting1 from "@/assets/painting1.jpg";
import painting2 from "@/assets/painting2.jpg";
import painting3 from "@/assets/painting3.jpg";
import crochet1 from "@/assets/crochet1.jpg";
import crochet2 from "@/assets/crochet2.jpg";
import crochet3 from "@/assets/crochet3.jpg";
import { Product } from "@/components/ProductCard";

export const paintings: Product[] = [
  {
    id: "p1",
    name: "Golden Bloom",
    price: 120,
    image: painting1,
    category: "painting",
    description: "Floral abstract in warm gold tones",
  },
  {
    id: "p2",
    name: "Mountain Sunset",
    price: 150,
    image: painting2,
    category: "painting",
    description: "Serene landscape at golden hour",
  },
  {
    id: "p3",
    name: "Elegance",
    price: 200,
    image: painting3,
    category: "painting",
    description: "Classical portrait in warm palette",
  },
];

export const crochetItems: Product[] = [
  {
    id: "c1",
    name: "Cozy Bear",
    price: 45,
    image: crochet1,
    category: "crochet",
    description: "Handmade amigurumi teddy bear",
  },
  {
    id: "c2",
    name: "Daisy Blanket",
    price: 85,
    image: crochet2,
    category: "crochet",
    description: "Soft floral pattern throw blanket",
  },
  {
    id: "c3",
    name: "Flower Bouquet",
    price: 55,
    image: crochet3,
    category: "crochet",
    description: "Everlasting crochet flower arrangement",
  },
];
