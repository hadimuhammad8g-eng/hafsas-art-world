-- Assign admin role to both hafsa accounts
INSERT INTO public.user_roles (user_id, role)
VALUES 
  ('0a859ca1-b6a3-4a6e-8e79-adc9ebbe6194', 'admin'),
  ('5d9e88d8-b3f0-4d94-b8a8-27f9fb179295', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

-- Also allow authenticated users to upload to storage (simpler policy)
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');