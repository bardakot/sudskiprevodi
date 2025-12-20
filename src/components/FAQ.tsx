import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const { t } = useTranslation();

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];

  return (
    <section id="faq" className="py-16 sm:py-20 bg-charcoal-lighter">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 px-2">
              {t('faq.title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              {t('faq.subtitle')}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {questions.map((q, index) => (
              <motion.div
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={q}
                  className="bg-card border border-border rounded-lg px-4 sm:px-6 data-[state=open]:border-primary transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 sm:py-5 text-sm sm:text-base min-h-[56px]">
                    {t(`faq.questions.${q}.q`)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed">
                    {t(`faq.questions.${q}.a`)}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
