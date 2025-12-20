import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo-removebg-preview.png';

const Footer = () => {
  const {
    t
  } = useTranslation();
  const currentYear = new Date().getFullYear();
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

        <div className="border-t border-border mt-6 sm:mt-8 pt-5 sm:pt-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center px-4">
            © {currentYear} {t('footer.companyName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;