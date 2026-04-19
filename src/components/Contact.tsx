import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Phone, Facebook, Instagram } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  phone: z.string().min(5, 'Phone number is required').max(20),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Using Formspree - simpler and more reliable
      const formspreeEndpoint = 'https://formspree.io/f/xjkzdzla'; // You'll need to replace this with your Formspree endpoint
      
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('service', t(`contact.serviceTypes.${data.service}`));
      formData.append('message', data.message);
      formData.append('_replyto', data.email);
      formData.append('_subject', `New contact from ${data.name}`);

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: t('contact.form.success'),
          description: "Your message has been sent successfully!",
          duration: 5000,
        });
        
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = ['legal', 'academic', 'business', 'medical', 'personal', 'other'];

  return (
    <section id="contact" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 px-2">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Information Section - Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-4 sm:mb-6 px-2 sm:px-0">
              {t('contact.info.title')}
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <a href="mailto:sudskiprevodimk@yahoo.com" className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors min-h-[72px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-sm sm:text-base break-all">sudskiprevodimk@yahoo.com</p>
                </div>
              </a>

              <a href="tel:+38975252097" className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors min-h-[72px]">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium text-sm sm:text-base">+389 75 252 097</p>
                </div>
              </a>

              <a 
                href="https://www.facebook.com/profile.php?id=61583426203595" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors min-h-[72px]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Facebook className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Facebook</p>
                  <p className="font-medium text-sm sm:text-base">SudskiPrevodiMK</p>
                </div>
              </a>

              <a 
                href="https://www.instagram.com/sudski_prevodi_mk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-card border border-border rounded-lg hover:bg-secondary/50 transition-colors min-h-[72px]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Instagram className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Instagram</p>
                  <p className="font-medium text-sm sm:text-base">@sudski_prevodi_mk</p>
                </div>
              </a>
              <div className="mt-6 sm:mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.5130256270354!2d21.452362176330503!3d41.98926417122989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354158ffbd68c1d%3A0x9fca3213a6c00252!2sSudski%20Prevodi%20MK!5e0!3m2!1sen!2smk!4v1776630264878!5m2!1sen!2smk"
              className="w-full h-[250px] sm:h-[300px] rounded-lg border border-border"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
              
            </div>
          </motion.div>
          {/* here */}
          {/* Contact Form Section - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card border border-border rounded-lg p-5 sm:p-6 lg:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.name')} {...field} className="h-11 sm:h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('contact.form.email')} {...field} className="h-11 sm:h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder={t('contact.form.phone')} {...field} className="h-11 sm:h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">{t('contact.form.service')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11 sm:h-12 text-base">
                              <SelectValue placeholder={t('contact.form.service')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {t(`contact.serviceTypes.${type}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('contact.form.message')}
                            className="min-h-[120px] sm:min-h-[140px] resize-none text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full group min-h-[48px] sm:min-h-[52px] text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t('contact.form.sending') || 'Sending...'
                    ) : (
                      <>
                        {t('contact.form.submit')}
                        <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
