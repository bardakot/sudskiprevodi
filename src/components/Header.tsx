import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import mkFlag from "@/assets/flags/mk.png";
import gbFlag from "@/assets/flags/gb.png";
import rsFlag from "@/assets/flags/rs.png";
import logo from "@/assets/logo-removebg-preview.png";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent scroll when menu is open on mobile
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  const languages = [
    {
      code: "mk",
      flag: mkFlag,
      label: "MK",
    },
    {
      code: "en",
      flag: gbFlag,
      label: "EN",
    },
    {
      code: "sr",
      flag: rsFlag,
      label: "SR",
    },
  ];
  const navItems = [
    {
      key: "home",
      href: "#home",
    },
    {
      key: "services",
      href: "#services",
    },
    {
      key: "process",
      href: "#process",
    },
    {
      key: "contact",
      href: "#contact",
    },
    {
      key: "faq",
      href: "#faq",
    },
  ];
  const languagePages = [
    { key: "enmk", href: "/services/english-macedonian-translation/" },
    { key: "srmk", href: "/services/serbian-macedonian-translation/" },
    { key: "trmk", href: "/services/turkish-macedonian-translation/" },
  ];
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      // Close mobile menu first
      setIsMenuOpen(false);
      
      // Add a small delay to ensure menu animation completes
      setTimeout(() => {
        const headerHeight = window.innerWidth >= 768 ? 80 : 72;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 300);
    }
  };
  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 sm:h-16 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollToSection(item.href)}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 px-3"
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary data-[state=open]:text-primary transition-colors py-2 px-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {t("nav.languages")}
              <ChevronDown
                size={15}
                className="transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[240px]">
              {languagePages.map((page) => (
                <DropdownMenuItem key={page.key} asChild>
                  <a href={page.href} className="cursor-pointer">
                    {t(`langPairs.${page.key}`)}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={i18n.language === lang.code ? "default" : "ghost"}
              size="sm"
              onClick={() => i18n.changeLanguage(lang.code)}
              className="w-11 h-11 sm:w-10 sm:h-10 p-1 min-w-[44px]"
              title={lang.label}
            >
              <img src={lang.flag} alt={lang.label} className="w-full h-full object-cover rounded-sm" />
            </Button>
          ))}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden min-w-[44px] min-h-[44px] p-2 touch-manipulation active:bg-muted/70"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 sm:px-6 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50 min-h-[48px] active:bg-muted/70 touch-manipulation"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}

              <div className="mt-2 pt-3 border-t border-border">
                <p className="px-4 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("nav.languages")}
                </p>
                {languagePages.map((page) => (
                  <a
                    key={page.key}
                    href={page.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-muted/50 min-h-[48px] active:bg-muted/70 touch-manipulation"
                  >
                    {t(`langPairs.${page.key}`)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
