import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Locations = () => {
  const { t, i18n } = useTranslation();
  const englishPrefix = i18n.language === 'en' ? '/en' : '';
  const locations = [
    { key: 'skopje', icon: Building2 },
    { key: 'prilep', icon: Truck },
    { key: 'bitola', icon: Truck },
  ];

  return (
    <section id="locations" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 px-2">
            {t('locations.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            {t('locations.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3 max-w-6xl mx-auto">
          {locations.map(({ key, icon: Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`${englishPrefix}/locations/${key}/`}
                className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Card className="h-full transition-colors group-hover:border-primary">
                  <CardHeader className="p-5 sm:p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="text-primary" size={24} aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl">
                      {t(`locations.cities.${key}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 sm:p-6 pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                      {t(`locations.cities.${key}.description`)}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-primary">
                      {t('locations.view')}
                      <ArrowRight size={17} className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
