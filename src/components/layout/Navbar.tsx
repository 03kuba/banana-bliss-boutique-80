import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="font-display font-bold text-xl text-primary">BANANAS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Shop
            </Link>
            <Link to="/shop?category=tees" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Tees
            </Link>
            <Link to="/shop?category=hoodies" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Hoodies
            </Link>
            <Link to="/shop?category=accessories" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
              Accessories
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <ShoppingBag className="w-6 h-6 text-foreground" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                Shop All
              </Link>
              <Link
                to="/shop?category=tees"
                onClick={() => setIsOpen(false)}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                Tees
              </Link>
              <Link
                to="/shop?category=hoodies"
                onClick={() => setIsOpen(false)}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                Hoodies
              </Link>
              <Link
                to="/shop?category=accessories"
                onClick={() => setIsOpen(false)}
                className="text-foreground/80 hover:text-foreground transition-colors font-medium py-2"
              >
                Accessories
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
