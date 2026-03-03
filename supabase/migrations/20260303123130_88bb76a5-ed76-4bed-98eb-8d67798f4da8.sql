
-- Add sale_price column for Special Sale section
ALTER TABLE public.products ADD COLUMN sale_price numeric DEFAULT NULL;
