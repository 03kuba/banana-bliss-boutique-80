import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export default function Cart() {
  const { items, loading, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-6xl mb-4 block">🍌</span>
            <h2 className="text-2xl font-display font-bold mb-4">Sign in to view your cart</h2>
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <span className="text-4xl animate-wiggle inline-block">🍌</span>
          <p className="mt-4 text-muted-foreground">Loading your cart...</p>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-display font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Time to go bananas with some shopping!
            </p>
            <Link to="/shop">
              <Button className="gap-2">
                Start Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold mb-8"
          >
            Your Cart
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {item.product?.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10">
                        <span className="text-3xl">🍌</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product_id}`}
                      className="font-display font-semibold hover:text-primary transition-colors"
                    >
                      {item.product?.name || 'Product'}
                    </Link>
                    {item.size && (
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    )}
                    <p className="font-bold mt-1">
                      ${Number(item.product?.price || 0).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24"
            >
              <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full gap-2" size="lg" disabled>
                Checkout Coming Soon
                <ArrowRight className="w-4 h-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Payment integration coming soon! 🍌
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
