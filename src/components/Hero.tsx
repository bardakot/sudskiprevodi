import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, MoveRight, MoveLeft } from 'lucide-react';
import mkFlag from '@/assets/flags/mk.png';
import gbFlag from '@/assets/flags/gb.png';
import rsFlag from '@/assets/flags/rs.png';
import certificateOutline from '@/assets/decorations/certificate-outline.png';
import diplomaOutline from '@/assets/decorations/diploma-outline-removebg-preview.png';
import documentsOutline from '@/assets/decorations/documents-outline-removebg-preview.png';
import bookOutline from '@/assets/decorations/book-outline-removebg-preview.png';
import writingBookOutline from '@/assets/decorations/writing-book-outline-removebg-preview.png';
import closedDictionaryOutline from '@/assets/decorations/closed-dictionary-outline-removebg-preview.png';
const Hero = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const getLanguageName = (code: string) => {
    const names = {
      en: {
        mk: 'Macedonian',
        en: 'English',
        sr: 'Serbian'
      },
      mk: {
        mk: 'Македонски',
        en: 'Англиски',
        sr: 'Српски'
      },
      sr: {
        mk: 'Македонски',
        en: 'Енглески',
        sr: 'Српски'
      }
    };
    return names[i18n.language as keyof typeof names]?.[code as keyof typeof names.en] || code;
  };
  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-background to-charcoal opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Mobile decorations - smaller and fewer */}
      <div className="sm:hidden">
        <motion.img 
          src={writingBookOutline} 
          alt="" 
          className="absolute top-[-4%] right-[2%] opacity-[0.20] rotate-12 pointer-events-none"
          style={{ width: '15rem' }}
          animate={{
            y: [0, -8, 0],
            rotate: [12, 15, 12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.img 
          src={diplomaOutline} 
          alt="" 
          className="absolute top-[15%] left-[2%] opacity-[0.20] -rotate-6 pointer-events-none"
          style={{ width: '13.5rem' }}
          animate={{
            y: [0, 12, 0],
            rotate: [-6, -9, -6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.img 
          src={bookOutline} 
          alt="" 
          className="absolute bottom-[35%] left-[1%] opacity-[0.10] -rotate-12 pointer-events-none"
          style={{ width: '13.5rem' }}
          animate={{
            y: [0, 10, 0],
            rotate: [-12, -15, -12],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.img 
          src={closedDictionaryOutline} 
          alt="" 
          className="absolute bottom-[10%] right-[1%] opacity-[0.20] rotate-8 pointer-events-none"
          style={{ width: '15rem' }}
          animate={{
            y: [0, -10, 0],
            rotate: [8, 11, 8],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.img 
          src={documentsOutline} 
          alt="" 
          className="absolute top-[65%] right-[50%] opacity-[0.20] rotate-6 pointer-events-none"
          style={{ width: '12rem' }}
          animate={{
            y: [0, -6, 0],
            rotate: [6, 9, 6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Desktop/Tablet decorations - larger and more detailed */}
      <div className="hidden sm:block">
        <motion.img 
          src={writingBookOutline} 
          alt="" 
          className="absolute top-[-2%] right-[12%] w-64 md:w-80 lg:w-96 opacity-[0.30] rotate-12 pointer-events-none"
          animate={{
            y: [0, -15, 0],
            rotate: [12, 15, 12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.img 
          src={diplomaOutline} 
          alt="" 
          className="absolute top-[2%] left-[18%] w-56 md:w-72 lg:w-80 opacity-[0.30] -rotate-6 pointer-events-none"
          animate={{
            y: [0, 20, 0],
            rotate: [-6, -9, -6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.img 
          src={closedDictionaryOutline} 
          alt="" 
          className="absolute bottom-[18%] right-[8%] w-64 md:w-80 lg:w-96 opacity-[0.30] rotate-[8deg] pointer-events-none"
          animate={{
            y: [0, -12, 0],
            rotate: [8, 11, 8],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.img 
          src={bookOutline} 
          alt="" 
          className="absolute bottom-[42%] left-[5%] w-48 md:w-64 lg:w-80 opacity-[0.30] -rotate-12 pointer-events-none"
          animate={{
            y: [0, 18, 0],
            rotate: [-12, -15, -12],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.img 
          src={documentsOutline} 
          alt="" 
          className="absolute top-[62%] left-[12%] w-40 md:w-52 lg:w-64 opacity-[0.30] rotate-6 pointer-events-none"
          animate={{
            y: [0, -10, 0],
            rotate: [6, 9, 6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="max-w-4xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 py-3 sm:py-3 bg-card border border-border rounded-2xl sm:rounded-full mb-8 px-4 sm:px-[9px]">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <img src={mkFlag} alt="MK" className="w-6 h-5 sm:w-5 sm:h-4 object-cover rounded-sm" />
              <span className="whitespace-nowrap">{getLanguageName('mk')}</span>
              <div className="flex flex-col -space-y-2">
                <MoveRight size={16} className="text-primary" />
                <MoveLeft size={16} className="text-primary" />
              </div>
              <span className="whitespace-nowrap">{getLanguageName('en')}</span>
              <img src={gbFlag} alt="EN" className="w-6 h-5 sm:w-5 sm:h-4 object-cover rounded-sm" />
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <img src={mkFlag} alt="MK" className="w-6 h-5 sm:w-5 sm:h-4 object-cover rounded-sm" />
              <span className="whitespace-nowrap">{getLanguageName('mk')}</span>
              <div className="flex flex-col -space-y-2">
                <MoveRight size={16} className="text-primary" />
                <MoveLeft size={16} className="text-primary" />
              </div>
              <span className="whitespace-nowrap">{getLanguageName('sr')}</span>
              <img src={rsFlag} alt="SR" className="w-6 h-5 sm:w-5 sm:h-4 object-cover rounded-sm" />
            </div>
          </motion.div>

          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="text-3xl sm:text-5xl md:text-7xl font-heading font-bold mb-6 text-balance px-2">
            {t('hero.title')}
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }} className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-12 text-balance px-2">
            {t('hero.subtitle')}
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.8
        }}>
            <Button size="lg" onClick={scrollToContact} className="group px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold min-h-[52px] sm:min-h-[56px]">
              {t('hero.cta')}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>;
};
export default Hero;