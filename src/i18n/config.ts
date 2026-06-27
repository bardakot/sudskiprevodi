import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        process: 'Translation Process',
        contact: 'Contact',
        faq: 'FAQ',
      },
      hero: {
        title: 'Professional Legal Translation Services',
        subtitle: 'Certified translations of legal, academic, business, and other types of documents',
        languages: 'Macedonian ↔ English • Macedonian ↔ Serbian',
        cta: 'Request Translation',
      },
      services: {
        title: 'Translation Services',
        subtitle: 'Comprehensive translation services by court-certified translator for all your document needs',
        types: {
          title: 'Document Types We Translate',
          legal: {
            title: 'Legal Documents',
            desc: 'Contracts, judgements, criminal proceedings/conviction certificates and other court records',
          },
          academic: {
            title: 'Academic Documents',
            desc: 'Diplomas, scientific papers, texts, essays, projects and other',
          },
          business: {
            title: 'Business Documents',
            desc: 'Business reports, registration documents, financial documents, business correspondence and other',
          },
          medical: {
            title: 'Medical Documents',
            desc: 'Medical reports, prescriptions, medical records and other medical documentation',
          },
          personal: {
            title: 'Personal Documents',
            desc: 'Passports, ID cards, driver\'s licenses, visas, and other personal documents',
          },
        },
        process: {
          title: 'The Translation Process',
          step1: {
            title: 'Online Order',
            desc: 'Submit your documents online via email, Viber, WhatsApp or other communication tool that is most suitable for you, or deliver them to us physically',
          },
          step2: {
            title: 'Order Confirmation',
            desc: 'We confirm your order and arrange all details regarding it',
          },
          step3: {
            title: 'Translation',
            desc: 'We complete the translation of your documents in the shortest possible time, in accordance with your needs. Typically 1 day for smaller volume of documents, and 3 days for translation of more extensive material',
          },
          step4: {
            title: 'Notarization / Apostille',
            desc: 'If you need notary certification of the translated documents or apostille stamp, in order to use the documents domestically and abroad, we provide them with your authorization',
          },
          step5: {
            title: 'Free Delivery',
            desc: 'We deliver the translated documents to your address free of charge',
          },
        },
      },
      contact: {
        title: 'Get in Touch!',
        subtitle: 'Request a translation or ask us any questions',
        info: {
          title: 'Contact Information:',
        },
        form: {
          name: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          service: 'Service Type',
          message: 'Message',
          submit: 'Send Request',
          success: 'Thank you! We will contact you soon.',
          error: 'Something went wrong. Please try again.',
        },
        serviceTypes: {
          legal: 'Legal Translation',
          academic: 'Academic Translation',
          business: 'Business Translation',
          medical: 'Medical Translation',
          personal: 'Personal Documents Translation',
          other: 'Other',
        },
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Everything you need to know about our translation services',
        questions: {
          q1: {
            q: 'How long does a translation take?',
            a: 'The translation time depends on the complexity and volume of the material, but typically for smaller volumes of documents, the translation will be ready the next day, and for larger volumes, it will be completed within 3 days. Additionally, due to urgency, a shorter deadline for translation can be arranged.',
          },
          q2: {
            q: 'Are your translations institutionally recognized domestically and abroad?',
            a: 'Yes, all our translations are officially recognized in all institutions domestically and abroad. Additionally, depending on the purpose of your documents, institutions may require your documents and translation to be notarized or apostilled.',
          },
          q3: {
            q: 'Are your translations recognized for nostrification?',
            a: 'Yes, our translation is recognized for nostrification and based on it, you can apply to the relevant institutions for nostrification of your document.',
          },
          q4: {
            q: 'Do you offer notarization and apostille services?',
            a: 'Yes, we can arrange notarization or apostille for your translated documents if required by the institution where you submit your documents.',
          },
          q5: {
            q: 'Can I send you documents online or do I need to deliver them physically?',
            a: 'There is no need to physically deliver your documents to us, it is sufficient to send us clearly readable scanned copies or photos of them.',
          },
          q6: {
            q: 'How is delivery handled?',
            a: 'We provide free delivery of your translated documents to your address and additionally deliver them to you electronically.',
          },
          q7: {
            q: 'How much does translation of one document cost?',
            a: 'The price for document translation depends on the document type, complexity, volume, and urgency of the translation. Contact us for the best personalized offer, based on your specific needs.',
          },
        },
      },
      footer: {
        companyName: 'Sudski Prevodi MK',
        tagline: 'Professional translation services from a certified court translator you can trust!',
        rights: 'All rights reserved.',
        contact: 'Contact Us',
        servicesTitle: 'Services',
        services: {
          english: 'English–Macedonian translation',
          serbian: 'Serbian–Macedonian translation',
          turkish: 'Turkish–Macedonian translation',
        },
      },
    },
  },
  mk: {
    translation: {
      nav: {
        home: 'Почетна',
        services: 'Услуги',
        process: 'Процесот на Преведување',
        contact: 'Контакт',
        faq: 'ЧПП',
      },
      hero: {
        title: 'Професионални Судски Преводи',
        subtitle: 'Овластени преводи на правни, академски, деловни и други видови на документи',
        languages: 'Македонски ↔ Англиски • Македонски ↔ Српски',
        cta: 'Побарај Превод',
      },
      services: {
        title: 'Преведувачки Услуги',
        subtitle: 'Сеопфатни преведувачки услуги од овластен судски преведувач за сите ваши документи',
        types: {
          title: 'Видови На Документи Кои Ги Преведуваме',
          legal: {
            title: 'Правни Документи',
            desc: 'Договори, пресуди, потврди за кривична/казнена евиденција, уверенија, изводи и други',
          },
          academic: {
            title: 'Академски Документи',
            desc: 'Дипломи, свидетелства, научни трудови, текстови, есеи, проекти и друго',
          },
          business: {
            title: 'Деловни Документи',
            desc: 'Деловни извештаи,  регистрациони документи, финансиски документи, деловна кореспонденција и друго ',
          },
          medical: {
            title: 'Медицински Документи',
            desc: 'Лекарски извештаи, рецепти, медицински картони и останата медицинска документација',
          },
          personal: {
            title: 'Лични Документи',
            desc: 'Пасоши, лични карти, возачки дозволи, визи и други лични документи',
          },
        },
        process: {
          title: 'Процесот на Преведување',
          step1: {
            title: 'Онлајн Нарачка',
            desc: 'Испратете ги вашите документи онлајн преку е-маил, Viber, WhatsApp или друга комуникациска алатка која е најсоодветна за Вас или доставете ни ги физички',
          },
          step2: {
            title: 'Потврда на Нарачката',
            desc: 'Ја потврдуваме вашата нарачка и ги договараме сите детали околу истата',
          },
          step3: {
            title: 'Превод',
            desc: 'Го изготвуваме преводот на вашите документи во најкраток можен рок, во согласност со вашите потреби. Најчесто 1 ден за помал обем на документи, а 3 дена за превод на пообемен материјал',
          },
          step4: {
            title: 'Нотаризација / Апостил',
            desc: 'Доколку имате потреба од нотарска заверка на преведените документи или апостил печат, со цел да ги користите документите во земјата и во странство, истите ги обезбедуваме со ваше овластување',
          },
          step5: {
            title: 'Бесплатна Достава',
            desc: 'Преведените документи бесплатно ги доставуваме на вашата адреса',
          },
        },
      },
      contact: {
        title: 'Контактирајте нè!',
        subtitle: 'Побарајте превод или поставете прашање',
        info: {
          title: 'Контакт информации:',
        },
        form: {
          name: 'Име и Презиме',
          email: 'Емаил Адреса',
          phone: 'Телефонски Број',
          service: 'Тип на Услуга',
          message: 'Порака',
          submit: 'Испрати Барање',
          success: 'Ви благодариме! Наскоро ќе ве контактираме.',
          error: 'Нешто тргна наопаку. Ве молиме обидете се повторно.',
        },
        serviceTypes: {
          legal: 'Правен Превод',
          academic: 'Академски Превод',
          business: 'Деловен Превод',
          medical: 'Медицински Превод',
          personal: 'Превод на Лични Документи',
          other: 'Друго',
        },
      },
      faq: {
        title: 'Често Поставувани Прашања',
        subtitle: 'Сè што треба да знаете во врска со судските преводи и нашите преведувачки услуги',
        questions: {
          q1: {
            q: 'Колку време трае еден превод?',
            a: 'Времетраењето на преведувањето на вашите документи зависи од комплексноста и обемноста на материјалот, но најчесто доколку се работи за помал обем на документи, преводот ќе биде готов веќе наредниот ден, а доколку станува збор за поголем обем на документи, тогаш истите ќе бидат преведени во рок од 3 дена. Дополнително, поради итност, може да биде договорен и пократок рок за преведување.',
          },
          q2: {
            q: 'Дали вашите преводи се институционално признати во земјата и во странство?',
            a: 'Да, сите наши преводи се официјално признати во сите институции во земјата и во странство. Дополнително, во зависност од намената на вашите документи, институциите може да бараат вашите документи и преводот да бидат нотарски заверени или со апостил печат.',
          },
          q3: {
            q: 'Дали вашите преводи се признати за нострификација?',
            a: 'Да, нашиот превод е признат за нострификација и врз основа на истиот, можете да аплицирате во соодветните институции за нострифицирање на вашиот документ.',
          },
          q4: {
            q: 'Дали нудите услуги за нотарска заверка и апостил печат?',
            a: 'Да, можеме да организираме нотарска заверка или апостил печат за вашите преведени документи, доколку тоа го бара институцијата до која ги доставувате вашите документи.',
          },
          q5: {
            q: 'Дали можам да ви ги испратам документите онлајн или потребно е истите физички да ви ги доставам?',
            a: 'Нема потреба физички да ни ги доставувате вашите документи, доволно е само да ни испратите јасно читливи скенирани копии или фотографии од истите. ',
          },
          q6: {
            q: 'Како се врши достава?',
            a: 'Вршиме бесплатна достава на вашите преведени документи, на ваша адреса и истите дополнително ви ги доставуваме и електронски.',
          },
          q7: {
            q: 'Колку чини превод на еден документ?',
            a: 'Цената за превод на документи зависи од типот на документот, комплексноста, обемноста и итноста на преводот. Контактирајте нè за најдобра пресонализирана понуда, базирана на вашите специфични потреби.',
          },
        },
      },
      footer: {
        companyName: 'Судски Преводи МК',
        tagline: 'Професионални преведувачки услуги од овластен судски преведувач, на кои можете да им верувате!',
        rights: 'Сите права задржани.',
        contact: 'Контактирајте Не',
        servicesTitle: 'Услуги',
        services: {
          english: 'Англиско-македонски превод',
          serbian: 'Српско-македонски превод',
          turkish: 'Турско-македонски превод',
        },
      },
    },
  },
  sr: {
    translation: {
      nav: {
        home: 'Почетна',
        services: 'Услуге',
        process: 'Процес Превођења',
        contact: 'Контакт',
        faq: 'ЧПП',
      },
      hero: {
        title: 'Професионалне Преводилачке Услуге',
        subtitle: 'Овлашћени преводи правних, академских, пословних и других типова докумената',
        languages: 'Македонски ↔ Енглески • Македонски ↔ Српски',
        cta: 'Затражи Превод',
      },
      services: {
        title: 'Преводилачке Услуге',
        subtitle: 'Свеобухватне овлашћене преводилачке услуге овлашћеног судског преводиоца за све ваше документе',
        types: {
          title: 'Типови Докумената Које Преводимо',
          legal: {
            title: 'Правни Документи',
            desc: 'Уговори, пресуде, потврде за кривичну/казнену евиденцију, уверења, изводи и остали документи',
          },
          academic: {
            title: 'Академски Документи',
            desc: 'Дипломе, научни радови, текстови, есеји, пројекти и друго',
          },
          business: {
            title: 'Пословни Документи',
            desc: 'Пословни извештаји, регистрациони документи, финансијски документи, пословна кореспонденција и друго',
          },
          medical: {
            title: 'Медицински Документи',
            desc: 'Лекарски извештаји, рецепти, медицински картони и остала медицинска документација',
          },
          personal: {
            title: 'Лични Документи',
            desc: 'Пасоши, личне карте, возачке дозволе, визе и остали лични документи',
          },
        },
        process: {
          title: 'Процес Превођења',
          step1: {
            title: 'Онлајн Наруџба',
            desc: 'Пошаљите своје документе онлајн преко имејла, Viber-а, WhatsApp-а или друге комуникационе алатке која вам највише одговара, или нам их доставите физички',
          },
          step2: {
            title: 'Потврда Наруџбе',
            desc: 'Потврђујемо вашу наруџбу и договарамо све детаље око исте',
          },
          step3: {
            title: 'Превођење',
            desc: 'Израђујемо превод ваших докумената у најкраћем могућем року, у складу са вашим потребама. Најчешће 1 дан за мању количину докумената, а 3 дана за превод обимнијег материјала',
          },
          step4: {
            title: 'Нотаризација / Апостил',
            desc: 'Уколико вам је потребна нотарска овера преведених докумената или апостил печат, у циљу коришћења докумената у земљи и иностранству, исте обезбеђујемо уз ваше овлашћење',
          },
          step5: {
            title: 'Бесплатна Достава',
            desc: 'Преведене документе бесплатно достављамо на вашу адресу',
          },
        },
      },
      contact: {
        title: 'Контактирајте нас!',
        subtitle: 'Затражите превод или нам поставите питање',
        info: {
          title: 'Контакт информације:',
        },
        form: {
          name: 'Име и Презиме',
          email: 'Имејл Адреса',
          phone: 'Број Телефона',
          service: 'Тип Услуге',
          message: 'Порука',
          submit: 'Пошаљи Захтев',
          success: 'Хвала вам! Ускоро ћемо вас контактирати.',
          error: 'Нешто је пошло наопако. Молимо покушајте поново.',
        },
        serviceTypes: {
          legal: 'Правни Превод',
          academic: 'Академски Превод',
          business: 'Пословни Превод',
          medical: 'Медицински Превод',
          personal: 'Превод Личних Докумената',
          other: 'Друго',
        },
      },
      faq: {
        title: 'Често Постављана Питања',
        subtitle: 'Све што треба да знате о нашим преводилачким услугама',
        questions: {
          q1: {
            q: 'Колико времена траје један превод?',
            a: 'Трајање превођења ваших докумената зависи од сложености и обима материјала, али најчешће ако се ради о мањем обиму докумената, превод ће бити готов већ следећег дана, а ако је реч о већем обиму докумената, онда ће исти бити преведени у року од 3 дана. Додатно, због хитности, може се договорити и краћи рок за превођење.',
          },
          q2: {
            q: 'Да ли су ваши преводи институционално признати у земљи и иностранству?',
            a: 'Да, сви наши преводи су званично признати у свим институцијама у земљи и иностранству. Додатно, у зависности од намене ваших докумената, институције могу тражити да ваши документи и превод буду нотарски оверени или са апостил печатом.',
          },
          q3: {
            q: 'Да ли су ваши преводи признати за нострификацију?',
            a: 'Да, наш превод је признат за нострификацију и на основу истог, можете аплицирати у одговарајуће институције за нострификовање вашег документа.',
          },
          q4: {
            q: 'Да ли нудите услуге нотарске овере и апостил печата?',
            a: 'Да, можемо организовати нотарску оверу или апостил печат за ваше преведене документе, ако то захтева институција којој достављате ваше документе.',
          },
          q5: {
            q: 'Да ли могу да вам пошаљем документе онлајн или је потребно да их физички доставим?',
            a: 'Нема потребе да нам физички достављате ваше документе, довољно је само да нам пошаљете јасно читљиве скениране копије или фотографије истих.',
          },
          q6: {
            q: 'Како се врши достава?',
            a: 'Вршимо бесплатну доставу ваших преведених докумената, на вашу адресу и исте додатно вам достављамо и електронски.',
          },
          q7: {
            q: 'Колико кошта превод једног документа?',
            a: 'Цена за превод докумената зависи од типа документа, сложености, обима и хитности превода. Контактирајте нас за најбољу персонализовану понуду, базирану на вашим специфичним потребама.',
          },
        },
      },
      footer: {
        companyName: 'Судски Преводи МК',
        tagline: 'Професионалне преводилачке услуге од овлашћеног судског преводиоца, у које се можете поуздати!',
        rights: 'Сва права задржана.',
        contact: 'Контактирајте Нас',
        servicesTitle: 'Услуге',
        services: {
          english: 'Енглеско-македонски превод',
          serbian: 'Српско-македонски превод',
          turkish: 'Турско-македонски превод',
        },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'mk',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
