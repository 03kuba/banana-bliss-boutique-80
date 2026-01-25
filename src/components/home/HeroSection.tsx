import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Floating Bananas Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl md:text-8xl opacity-20"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, '-20px', '0px'],
              rotate: [null, 5, -5, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 2
            }}
          >
            🍌
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              🍌 New Drop Available
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6"
          >
            Go{' '}
            <span className="text-accent">Bananas</span>
            <br />
            With Style
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-xl mb-8"
          >
            Tropical streetwear for those who dare to stand out. 
            Bold designs that make a statement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop">
              <Button size="lg" className="gap-2 text-lg px-8 banana-shadow">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/shop?category=tees">
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Tees
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2"
      >
        <div className="relative">
          <div className="w-96 h-96 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="text-[20rem] animate-float relative z-10">
            🍌
          </div>
        </div>
      </motion.div>
    </section>
  );
}
