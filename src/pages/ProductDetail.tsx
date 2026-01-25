import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id || '');
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id, selectedSize || undefined);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <span className="text-6xl mb-4 block">🍌</span>
          <h2 className="text-2xl font-display font-bold mb-4">Product not found</h2>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-square rounded-2xl overflow-hidden bg-muted"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10">
                  <span className="text-[10rem]">🍌</span>
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              {product.category && (
                <span className="text-accent font-medium uppercase text-sm tracking-wider mb-2">
                  {product.category}
                </span>
              )}
              
              <h1 className="text-4xl font-display font-bold mb-4">
                {product.name}
              </h1>
              
              <p className="text-3xl font-bold mb-6">
                ${Number(product.price).toFixed(2)}
              </p>
              
              <p className="text-muted-foreground mb-8">
                {product.description || 'Premium banana-themed apparel made with high-quality materials. Perfect for those who want to stand out from the crowd.'}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <label className="block font-medium mb-3">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block font-medium mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                size="lg"
                className="gap-2 text-lg"
                onClick={handleAddToCart}
                disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </Button>

              {product.sizes && product.sizes.length > 0 && !selectedSize && (
                <p className="text-sm text-muted-foreground mt-2">
                  Please select a size
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
