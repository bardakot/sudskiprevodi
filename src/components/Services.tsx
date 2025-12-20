import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scale, GraduationCap, Briefcase, Heart, FileCheck, MessageSquare, FileText, Shield, Package, IdCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Services = () => {
  const { t } = useTranslation();

  const documentTypes = [
    { icon: Scale, key: 'legal' },
    { icon: GraduationCap, key: 'academic' },
    { icon: Briefcase, key: 'business' },
    { icon: Heart, key: 'medical' },
    { icon: IdCard, key: 'personal' },
  ];

  const processSteps = [
    { icon: MessageSquare, key: 'step1', number: '01' },
    { icon: FileCheck, key: 'step2', number: '02' },
    { icon: FileText, key: 'step3', number: '03' },
    { icon: Shield, key: 'step4', number: '04' },
    { icon: Package, key: 'step5', number: '05' },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 bg-charcoal-lighter">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 px-2">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Document Types */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-center mb-8 sm:mb-12 px-2">
            {t('services.types.title')}
          </h3>
          <div className="space-y-4 sm:space-y-6">
            {/* First row - 2 cards */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {documentTypes.slice(0, 2).map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                          <Icon className="text-primary" size={24} />
                        </div>
                        <CardTitle className="text-lg sm:text-xl">
                          {t(`services.types.${type.key}.title`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                          {t(`services.types.${type.key}.desc`)}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            {/* Second row - 3 cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {documentTypes.slice(2).map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={type.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 2) * 0.1 }}
                  >
                    <Card className="h-full hover:border-primary transition-colors">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                          <Icon className="text-primary" size={24} />
                        </div>
                        <CardTitle className="text-lg sm:text-xl">
                          {t(`services.types.${type.key}.title`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <CardDescription className="text-sm sm:text-base leading-relaxed">
                          {t(`services.types.${type.key}.desc`)}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div id="process">
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-center mb-8 sm:mb-12 px-2">
            {t('services.process.title')}
          </h3>
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:border-primary transition-colors">
                    <CardHeader className="flex flex-row items-start gap-3 sm:gap-4 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="text-primary" size={24} />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-mono text-primary mb-1 block">
                            {step.number}
                          </span>
                          <CardTitle className="text-base sm:text-lg">
                            {t(`services.process.${step.key}.title`)}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {t(`services.process.${step.key}.desc`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
