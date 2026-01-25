import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import type { Tables } from '@/integrations/supabase/types';

interface ProductCardProps {
  product: Tables<'products'>;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, product.sizes?.[0] || undefined);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-primary/10">
              <span className="text-6xl">🍌</span>
            </div>
          )}
          
          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </Button>
          </motion.div>

          {/* Category Badge */}
          {product.category && (
            <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium capitalize">
              {product.category}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
            {product.description || 'Premium banana-themed apparel'}
          </p>
          <p className="font-bold text-lg">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
