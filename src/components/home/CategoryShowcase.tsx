import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Tees',
    slug: 'tees',
    emoji: '👕',
    description: 'Essential banana prints',
    gradient: 'from-accent/40 to-secondary/40'
  },
  {
    name: 'Hoodies',
    slug: 'hoodies',
    emoji: '🧥',
    description: 'Cozy tropical vibes',
    gradient: 'from-primary/30 to-jungle-light/30'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    emoji: '🎒',
    description: 'Complete the look',
    gradient: 'from-tropical/30 to-accent/30'
  }
];

export function CategoryShowcase() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium mb-2 block">Categories</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Shop by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/shop?category=${category.slug}`}>
                <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.gradient} p-8 h-64 group cursor-pointer transition-all hover:shadow-xl`}>
                  <div className="relative z-10">
                    <span className="text-5xl mb-4 block">{category.emoji}</span>
                    <h3 className="text-2xl font-display font-bold mb-2">{category.name}</h3>
                    <p className="text-foreground/70">{category.description}</p>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Decorative banana */}
                  <motion.span
                    className="absolute bottom-4 right-4 text-6xl opacity-30 group-hover:opacity-50 transition-opacity"
                    whileHover={{ rotate: 15 }}
                  >
                    🍌
                  </motion.span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
