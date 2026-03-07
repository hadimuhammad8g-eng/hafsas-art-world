import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct, uploadProductImage, DbProduct } from "@/hooks/useProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, Upload, X, Save, ArrowLeft, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

interface ProductForm {
  name: string;
  price: string;
  category: string;
  description: string;
  is_best_seller: boolean;
  sort_order: string;
  image_url: string;
  sale_price: string;
}

const emptyForm: ProductForm = {
  name: "",
  price: "",
  category: "painting",
  description: "",
  is_best_seller: false,
  sort_order: "0",
  image_url: "",
  sale_price: "",
};

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const fileRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Always render something — never return null early
  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#fdf8f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "sans-serif", color: "#7a5c40" }}>Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div style={{ minHeight: "100vh", background: "#fdf8f2", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <p style={{ fontFamily: "sans-serif", color: "#7a5c40" }}>Not authorized. Redirecting...</p>
        <button onClick={() => navigate("/admin/login")} style={{ padding: "8px 20px", background: "#7a5c40", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Go to Login
        </button>
      </div>
    );
  }

  const products = data?.raw || [];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
    setUploading(false);
  };

  const openEdit = (p: DbProduct) => {
    setForm({
      name: p.name,
      price: String(p.price),
      category: p.category,
      description: p.description,
      is_best_seller: p.is_best_seller,
      sort_order: String(p.sort_order),
      image_url: p.image_url,
      sale_price: p.sale_price ? String(p.sale_price) : "",
    });
    setEditing(p.id);
    setShowForm(true);
  };

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    const payload = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      description: form.description,
      is_best_seller: form.is_best_seller,
      sort_order: parseInt(form.sort_order) || 0,
      image_url: form.image_url,
      sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
    };
    try {
      if (editing) {
        await updateProduct.mutateAsync({ id: editing, ...payload });
        toast.success("Product updated!");
      } else {
        await addProduct.mutateAsync(payload);
        toast.success("Product added!");
      }
      setShowForm(false);
      setEditing(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted!");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-page-pattern">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
            <h1 className="font-heading text-lg text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-muted-foreground hidden sm:block">{user.email}</span>
            <button onClick={() => navigate("/")} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button onClick={signOut} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-foreground italic">
            Products ({products.length})
          </h2>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-body text-sm rounded-lg hover:opacity-90 transition-all shadow-gold"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="font-body text-sm text-red-600">
              Could not load products from database. You can still add new products below.
            </p>
          </div>
        )}

        {/* Product Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card rounded-xl p-6 w-full max-w-lg shadow-warm-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading text-xl text-foreground">
                    {editing ? "Edit Product" : "New Product"}
                  </h3>
                  <button onClick={() => setShowForm(false)}>
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1.5">Image</label>
                    {form.image_url ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary mb-2">
                        <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setForm((f) => ({ ...f, image_url: "" }))}
                          className="absolute top-2 right-2 p-1 bg-card rounded-full shadow-warm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileRef.current?.click()}
                        disabled={uploading}
                        className="w-full aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                      >
                        {uploading ? (
                          <p className="font-body text-sm text-muted-foreground">Uploading...</p>
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            <p className="font-body text-xs text-muted-foreground">Click to upload image</p>
                          </>
                        )}
                      </button>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-muted-foreground block mb-1.5">Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-muted-foreground block mb-1.5">Price (PKR)</label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                        className="w-full px-3 py-2.5 bg-background border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1.5">Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="painting">Painting</option>
                      <option value="crochet">Crochet</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1.5">Description</label>
                    <textarea
                      rows={2}
                      value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      placeholder="Brief description..."
                    />
                  </div>

                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-1.5">Sale Price (PKR) — optional</label>
                    <input
                      type="number"
                      value={form.sale_price}
                      onChange={(e) => setForm((f) => ({ ...f, sale_price: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-background border border-border rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="0"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_best_seller}
                      onChange={(e) => setForm((f) => ({ ...f, is_best_seller: e.target.checked }))}
                    />
                    <span className="font-body text-sm text-foreground">Best Seller</span>
                  </label>

                  <button
                    onClick={handleSave}
                    disabled={addProduct.isPending || updateProduct.isPending}
                    className="w-full py-3 bg-primary text-primary-foreground font-body text-sm uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Save className="w-4 h-4" />
                    {editing ? "Update Product" : "Create Product"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products List */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl shadow-warm border border-border">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-heading text-lg text-foreground mb-2">No products yet</p>
            <p className="font-body text-sm text-muted-foreground mb-6">
              Add your first product to start managing your store.
            </p>
            <button
              onClick={openNew}
              className="px-6 py-2 bg-primary text-primary-foreground font-body text-sm rounded-lg hover:opacity-90"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-lg overflow-hidden shadow-warm hover:shadow-warm-lg transition-shadow border border-border"
              >
                <div className="aspect-square bg-secondary">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-heading text-sm text-foreground">{p.name}</h3>
                      <p className="font-body text-xs text-muted-foreground capitalize">{p.category}</p>
                    </div>
                    <p className="font-heading text-sm text-primary whitespace-nowrap">PKR {p.price.toLocaleString()}</p>
                  </div>
                  {p.is_best_seller && (
                    <span className="inline-block mb-2 px-2 py-0.5 bg-accent/10 text-accent text-xs font-body rounded">
                      Best Seller
                    </span>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex-1 py-2 border border-border rounded-lg font-body text-xs text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-1"
                    >
                      <Pencil className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="py-2 px-3 border border-destructive/30 rounded-lg text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
