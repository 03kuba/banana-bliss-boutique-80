import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🍌</span>
              <span className="font-display font-bold text-2xl">BANANAS</span>
            </Link>
            <p className="text-primary-foreground/80 max-w-sm">
              Tropical streetwear that's absolutely bananas. Bold designs for bold souls.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=tees" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Tees
                </Link>
              </li>
              <li>
                <Link to="/shop?category=hoodies" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} BANANAS. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
