import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-removebg-preview.png';

const Footer = () => {
  const {
    t
  } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Real crawlable links to the standalone static pages (outside the SPA),
  // so they are no longer orphaned. Plain <a href> = full navigation, which is
  // what Googlebot follows.
  const services = [{
    href: '/services/english-macedonian-translation/',
    label: t('footer.services.english')
  }, {
    href: '/services/serbian-macedonian-translation/',
    label: t('footer.services.serbian')
  }, {
    href: '/services/turkish-macedonian-translation/',
    label: t('footer.services.turkish')
  }];

  return <footer className="bg-charcoal-lighter border-t border-border py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-36 w-auto" />
          </div>

          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-heading font-semibold text-primary mb-2">
              {t('footer.companyName')}    
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-6 sm:mt-8 pt-5 sm:pt-6 flex flex-col items-center gap-3">
          <nav aria-label={t('footer.servicesTitle')} className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground/70">
            {services.map(item => <a key={item.href} href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </a>)}
          </nav>
          <p className="text-xs sm:text-sm text-muted-foreground text-center px-4">
            © {currentYear} {t('footer.companyName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;