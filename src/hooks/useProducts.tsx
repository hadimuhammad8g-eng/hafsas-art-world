import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";
import { paintings, crochetItems, bestSellers } from "@/data/products";

export interface DbProduct {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
  is_best_seller: boolean;
  sort_order: number;
}

const mapToProduct = (p: DbProduct): Product => ({
  id: p.id,
  name: p.name,
  price: p.price,
  image: p.image_url,
  category: p.category,
  description: p.description,
});

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) throw error;

        const products = (data as DbProduct[]) || [];

        if (products.length > 0) {
          return {
            paintings: products.filter((p) => p.category === "painting").map(mapToProduct),
            crochetItems: products.filter((p) => p.category === "crochet").map(mapToProduct),
            bestSellers: products.filter((p) => p.is_best_seller).map(mapToProduct),
            raw: products,
          };
        }
      } catch (e) {
        console.warn("Failed to fetch products from DB, using static data", e);
      }

      // Fallback to static data
      return {
        paintings,
        crochetItems,
        bestSellers,
        raw: [] as DbProduct[],
      };
    },
  });
};

export const useAddProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<DbProduct, "id">) => {
      const { data, error } = await supabase
        .from("products")
        .insert(product as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbProduct> & { id: string }) => {
      const { data, error } = await supabase
        .from("products")
        .update(updates as any)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const uploadProductImage = async (file: File): Promise<string> => {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
};
