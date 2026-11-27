// // // updated code as per client requirement

// // updated code as per client requirement

// export const COMMON_EMAIL = "hello@innerbeingwellness.com";

// // CLIENT: ek hi CTA label poori site pe
// export const CTA_LABEL = "Book Free Discovery Call";

// export const siteData = {
//   brand: {
//     name: "INNER BEING WELLNESS",
//     shortName: "Inner Being",
//     tagline: "Fix the Being first, and the Doing will naturally follow.",
//     founderName: "Muazzam Abdul Rehman",
//     founderTitle:
//       "Managing Director, Founder & Frequency Wellness Coach Facility Management",
//     logoText: "IBW",
//     // CLIENT: transparent SVG milte hi sirf yeh path badalna hai
//     logoImage: "/assets/aistudio/sinner_being_logo.png",
//     contact: {
//       email: COMMON_EMAIL,
//       // CLIENT: Muazzam se number aate hi bharna (WhatsApp ke liye)
//       phone: "",
//       whatsapp: "",
//       whatsappDisplay: "+971 58 5811609",
//       whatsappMessage:
//         "Hello Inner Being Wellness, I would like to know more about a free discovery call.",
//       responseTime: "We aim to respond within two working days.",
//       serviceMode:
//         "Private frequency sessions and bioenergetic wellness guidance",
//       sessionFormat:
//         "Abu Dhabi & Dubai, UAE. Online and in-person sessions, subject to availability",
//     },
//     socialLinks: [
//       { name: "Instagram", href: "https://instagram.com" },
//       { name: "LinkedIn", href: "https://linkedin.com" },
//       { name: "YouTube", href: "https://youtube.com" },
//     ],
//   },

//   siteSettings: {
//     language: "en",
//     locale: "en-US",
//     themeColor: "#2D1C59",
//     backgroundColor: "#FBF9F5",
//   },

//   /**
//    * Design tokens used by HomePage (purple + teal + gold on off-white).
//    * CLIENT: globals.css ke brand tokens ke saath match kiya (consistent colors).
//    */
//   theme: {
//     primary: "#2D1C59",
//     secondary: "#0E6E6B",
//     gold: "#C5A265",
//     goldLight: "#F3CF63",
//     ink: "#445064",
//     muted: "#7A8599",
//     surface: "#FBF9F5",
//     surfaceAlt: "#F3EFE6",
//     card: "#FFFFFF",
//     dark: "#231754",
//     line: "rgba(45, 28, 89, 0.10)",
//   },

//   navigation: {
//     headerLinks: [
//       { label: "Home", href: "/", id: "home" },
//       {
//         label: "About Us",
//         href: "/about",
//         id: "about",
//         children: [
//           { label: "About Muazzam Abdul Rehman", href: "/about" },
//           { label: "About Janki Ravani", href: "/janki" },
//         ],
//       },
//       { label: "Offerings", href: "/offerings", id: "offerings" },
//       {
//         label: "Freedom from Resistance",
//         href: "/freedom-from-resistance",
//         id: "freedom-from-resistance",
//       },
//       { label: "Thoughts", href: "/thoughts", id: "thoughts" },
//       { label: "Contact", href: "/contact", id: "contact" },
//     ],
//     ctaButton: {
//       label: CTA_LABEL,
//       href: "/contact",
//       action: "scrollToContactForm",
//     },
//   },

//   /**
//    * Landing page nav: Home, Manifesto, Founder, Defaults, Frequencies, Reflections.
//    * "#id" hrefs match homePage.sectionIds.
//    */
//   landingNav: {
//     links: [
//       { label: "Home", href: "#home", id: "home" },
//       { label: "Manifesto", href: "#manifesto", id: "manifesto" },
//       {
//         label: "Founder",
//         href: "#founder",
//         id: "founder",
//         children: [
//           { label: "About Muazzam Abdul Rehman", href: "/about" },
//           { label: "About Janki Ravani", href: "/janki" },
//         ],
//       },
//       { label: "Defaults", href: "#four-defaults", id: "four-defaults" },
//       { label: "Frequencies", href: "#frequencies", id: "frequencies" },
//       { label: "Reflections", href: "#reflections", id: "reflections" },
//     ],
//     cta: { label: CTA_LABEL, href: "/contact" },
//   },

//   homePage: {
//     id: "home",
//     path: "/",
//     meta: {
//       title: "Inner Being Wellness | Fix the Being First",
//       description:
//         "Frequency-based energy healing, subconscious reprogramming and conscious awareness with Muazzam Abdul Rehman in Abu Dhabi & Dubai. Fix the Being first, and the Doing will naturally follow.",
//     },

//     sectionIds: {
//       hero: "home",
//       introduction: "introduction",
//       manifesto: "manifesto",
//       founder: "founder",
//       defaults: "four-defaults",
//       frequencies: "frequencies",
//       journey: "journey",
//       reflections: "reflections",
//       contact: "begin",
//     },

//     hero: {
//       badge: "INNER BEING WELLNESS • ABU DHABI & DUBAI",
//       titleLines: [
//         { text: "Fix the Being first,", tone: "primary" },
//         { text: "and the Doing will naturally follow.", tone: "secondary" },
//       ],
//       description:
//         "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So today we don't fix career, money, or relationships—we fix the BEING.",
//       primaryCta: { label: CTA_LABEL, href: "/contact#contact-form" },
//       secondaryCta: null,
//       botanicalBorder: null, // leaf removed

//       // Naya photo aate hi sirf src badalna
//       image: {
//         src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
//         alt: "A woman meditating at sunrise on a mountain overlook beneath an old tree",
//       },
//       // Janki intro video (hero, right side)
//       video: {
//         enabled: true,
//         src: "/assets/videos/inner being (1).mp4",
//         poster: "",
//         // label: "Meet Janki Ravani",
//         loop: true,
//         muted: true,
//         allowFullscreen: true,
//       },
//       tagline: "Your frequency is your new currency, waiting to be encashed!",
//       taglineShort: "Encash your frequency.",

//       // ⬇️ Purana founder block hatao, ye daalo
//       founder: {
//         name: "Janki Ravani",
//         title: "Co-Founder & Chief Happiness Coach",
//         badges: ["TEDx Speaker", "Global Happiness Leader"],
//         ctaNote: "Free discovery call · No obligation",
//       },

//       highlights: [
//         {
//           id: "clear-mind",
//           label: "Mental Clarity",
//           icon: "Lotus",
//           description: "Clears cognitive fog and overthinking",
//         },
//         {
//           id: "emotional-balance",
//           label: "Emotional Resilience",
//           icon: "Heart",
//           description: "Releases stress stored over time",
//         },
//         {
//           id: "aligned-energy",
//           label: "Aligned Energy",
//           icon: "Sun",
//           description: "Chakra balancing and biofield harmony",
//         },
//       ],
//     },

//     // hero: {
//     //   badge: "INNER BEING WELLNESS • ABU DHABI & DUBAI",
//     //   titleLines: [
//     //     { text: "Fix the Being first,", tone: "primary" },
//     //     { text: "and the Doing will naturally follow.", tone: "secondary" },
//     //   ],
//     //   description:
//     //     "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So today we don't fix career, money, or relationships—we fix the BEING.",
//     //   primaryCta: {
//     //     label: CTA_LABEL,
//     //     href: "/contact",
//     //   },
//     //   secondaryCta: null,
//     //   // CLIENT: large leaf graphic removed (blurry + distracting).
//     //   // HomePage mein `botanicalBorder?.src` se guard lagana (null safe).
//     //   botanicalBorder: null,
//     //   // CLIENT: yeh image office-related lagti hai. Naya photo aate hi sirf src badalna.
//     //   image: {
//     //     src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
//     //     alt: "A woman meditating at sunrise on a mountain overlook beneath an old tree",
//     //   },
//     //   // CLIENT: ~1 min intro video (Muazzam / Janki dengi). Hero mein image ke saath.
//     //   // Video aate hi src bharo aur enabled: true karo.
//     //   video: {
//     //     enabled: false,
//     //     src: "",
//     //     poster: "",
//     //     loop: true,
//     //     muted: true,
//     //     allowFullscreen: true,
//     //     afterVideoCtas: [
//     //       { label: "Learn more", href: "/about", variant: "secondary" },
//     //       { label: CTA_LABEL, href: "/contact", variant: "primary" },
//     //     ],
//     //   },
//     //   highlights: [
//     //     {
//     //       id: "clear-mind",
//     //       label: "Mental Clarity",
//     //       icon: "Lotus",
//     //       description: "Clears cognitive fog and overthinking",
//     //     },
//     //     {
//     //       id: "emotional-balance",
//     //       label: "Emotional Resilience",
//     //       icon: "Heart",
//     //       description: "Releases stress stored over time",
//     //     },
//     //     {
//     //       id: "aligned-energy",
//     //       label: "Aligned Energy",
//     //       icon: "Sun",
//     //       description: "Chakra balancing and biofield harmony",
//     //     },
//     //   ],
//     // },
//     // Hero ke neeche wide video section
//     // Hero ke neeche wide video section
//     videoSection: {
//       id: "intro-video",
//       eyebrow: "WATCH THE INTRODUCTION",
//       title: "Meet Inner Being Wellness",
//       description:
//         "A short introduction to the philosophy behind our work: fix the Being first, and the Doing will naturally follow.",
//       caption: "Introduction · approx. 1 min",
//       video: {
//         src: "/assets/videos/intro.mp4",
//         poster: "/assets/videos/intro-poster.jpg",
//         loop: true, // true = end screen ke baad auto replay
//         muted: true,
//         autoPlay: true,
//         allowFullscreen: true,
//       },
//       // Video khatam hone pe dikhne wala end screen
//       endScreen: {
//         enabled: true,
//         eyebrow: "THANK YOU FOR WATCHING",
//         title: "Ready to fix the Being first?",
//         replayDelay: 6, // seconds ke baad auto replay (5-6 rakh sakti ho)
//         primary: {
//           label: "Book Discovery Call",
//           href: "/contact#contact-form",
//         },
//         secondary: { label: "View Website", href: "#manifesto" },
//       },
//       ctas: [
//         { label: "Learn more", href: "/about", variant: "secondary" },
//         { label: CTA_LABEL, href: "/contact#contact-form", variant: "primary" },
//       ],
//     },

//     filmSection: {
//       id: "film",
//       eyebrow: "AS FEATURED IN THE FILM",
//       title: "Healy in “Frequencies: The Paradigm Shift”",
//       description:
//         "Healy is the main instrument we use in our coaching, and it is featured in the film Frequencies: The Paradigm Shift. Here is a glimpse from the film, which is releasing worldwide, bringing the conversation about frequencies to a wider audience.",

//       releaseNote: "Releasing worldwide in just a couple of days",

//       videos: [
//         {
//           src: "/assets/videos/video1.mp4",
//           title: "Healy in the film, clip 1",
//         },
//         {
//           src: "/assets/videos/video2.mp4",
//           title: "Healy in the film, clip 2",
//         },
//         {
//           src: "/assets/videos/video3.mp4",
//           title: "Healy in the film, clip 3",
//         },
//       ],

//       question:
//         "You've been curious about Healy for a while… what's stopping you from exploring it for yourself?",

//       subtext:
//         "Come for a free discovery call, clear your questions and see for yourself.",

//       note: "Wellness sessions complement, but do not replace, professional medical or mental-health care.",

//       cta: {
//         label: CTA_LABEL,
//         href: "/contact#contact-form",
//       },
//     },

//     // filmSection: {
//     //   id: "film",
//     //   eyebrow: "AS FEATURED IN THE FILM",
//     //   title: "Healy in “Frequencies: The Paradigm Shift”",
//     //   description:
//     //     "Healy is the main instrument we use in our coaching, and it is featured in the film Frequencies: The Paradigm Shift. Here is a glimpse from the film, which is releasing worldwide, bringing the conversation about frequencies to a wider audience.",
//     //   releaseNote: "Releasing worldwide in just a couple of days",
//     //   videos: [
//     //     {
//     //       src: "/assets/videos/healy-clip-1.mp4",
//     //       poster: "/assets/videos/healy-clip-1-poster.jpg",
//     //       title: "Healy in the film, clip 1",
//     //     },
//     //     {
//     //       src: "/assets/videos/healy-clip-2.mp4",
//     //       poster: "/assets/videos/healy-clip-2-poster.jpg",
//     //       title: "Healy in the film, clip 2",
//     //     },
//     //     {
//     //       src: "/assets/videos/healy-clip-3.mp4",
//     //       poster: "/assets/videos/healy-clip-3-poster.jpg",
//     //       title: "Healy in the film, clip 3",
//     //     },
//     //   ],
//     //   question:
//     //     "You've been curious about Healy for a while… what's stopping you from exploring it for yourself?",
//     //   subtext:
//     //     "Come for a free discovery call, clear your questions and see for yourself.",
//     //   note: "Wellness sessions complement, but do not replace, professional medical or mental-health care.",
//     //   cta: { label: CTA_LABEL, href: "/contact#contact-form" },
//     // },
//     introduction: {
//       eyebrow: "THE EVOLUTIONARY PATH",
//       title: "From Innocence to Identity Crisis",
//       paragraphs: [
//         "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances. True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
//         "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time, and we bring you back to your original state.",
//       ],
//       cta: {
//         label: "Learn Our Philosophy",
//         href: "/about",
//       },
//       image: {
//         src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
//         alt: "A calm practitioner meditating peacefully amidst mountains",
//       },
//     },

//     manifesto: {
//       ornament: "Lotus",
//       eyebrow: null,
//       title: "Our Manifesto",
//       subtitle: "Fix the BEING, and the Doing will naturally follow.",
//       pillars: [
//         {
//           id: "awareness",
//           title: "As Children",
//           icon: "Leaf",
//           color: "#D9F0EE",
//           accentColor: "#1F7A78",
//           description:
//             "We lived in pure presence, without barriers, beliefs or cultural conditioning. We simply were.",
//         },
//         {
//           id: "healing",
//           title: "Layered Identity",
//           icon: "Lotus",
//           color: "#E6DDFB",
//           accentColor: "#5B2FC2",
//           description:
//             "Labels of gender, nationality, status and career created fragile egos, stress and self-sabotage.",
//         },
//         {
//           id: "balance",
//           title: "Peace",
//           icon: "Sun",
//           color: "#FDE9C4",
//           accentColor: "#E08E12",
//           description: "If I am peace, my career decisions will be peaceful.",
//         },
//         {
//           id: "freedom",
//           title: "Love",
//           icon: "Heart",
//           color: "#FADBD3",
//           accentColor: "#B8683A",
//           description: "If I am love, my relationships will be loving.",
//         },
//       ],
//     },

//     // CLIENT: About Me content kam kiya. Chhoti intro + bullets (scan karna aasan).
//     // Poori story /about page pe hai. Component mein `bullets` render karna.
//     founderSpotlight: {
//       badge: "ABOUT THE FOUNDER",
//       name: "Muazzam Abdul Rehman",
//       subtitle: "From Executive Leadership to Inner Transformation",
//       paragraphs: [
//         "External success is only half the equation: true performance, vitality, and fulfillment begin from within.",
//       ],
//       bullets: [
//         "MBA, specialized in organizational leadership",
//         "Managing Director, Founder & Frequency Wellness Coach Facility Management (Abu Dhabi & Dubai)",
//         "Certified Master NLP Practitioner",
//         "EFT & Ho'oponopono Specialist",
//         "Bioenergetic Frequency Expert in Subconscious Reprogramming",
//       ],
//       cta: {
//         label: "Read the Full Story",
//         href: "/about",
//       },
//       image: {
//         src: "/assets/aistudio/image2_aedbb8dd.jpeg",
//         alt: "Muazzam Abdul Rehman seated calmly in a serene garden",
//       },
//       portraitImage: {
//         src: "/assets/aistudio/image2_aedbb8dd.jpeg",
//         alt: "Muazzam Abdul Rehman portrait",
//       },
//     },

//     fourDefaults: {
//       id: "four-defaults",
//       eyebrow: "BIO-ENERGETIC RESET",
//       title: "Returning to Your Original Default Settings",
//       subtitle:
//         "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time. We bring you back to your original state.",
//       // CLIENT: homepage pe sirf itne cards dikhao, baaki "Explore" / full view link se.
//       // Component: cards.slice(0, homeVisibleCount)
//       homeVisibleCount: 4,
//       fullViewCta: {
//         label: "View all default settings",
//         href: "/offerings",
//       },
//       cardCta: {
//         label: "Explore this practice",
//         href: "/offerings",
//       },
//       cards: [
//         {
//           id: "love",
//           title: "Love",
//           subtitle: "Default Setting 01",
//           icon: "Heart",
//           description: "Unconditional source resonance.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph__1__befd108a.png",
//             alt: "A person meditating on a mountain summit at dawn",
//           },
//         },
//         {
//           id: "peace",
//           title: "Peace",
//           subtitle: "Default Setting 02",
//           icon: "Flower2",
//           description: "Unshakable inner calm.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph__2__fe862626.png",
//             alt: "A luminous meditation silhouette in golden forest light",
//           },
//         },
//         {
//           id: "joy",
//           title: "Joy",
//           subtitle: "Default Setting 03",
//           icon: "Sun",
//           description: "Spontaneous lightness of being.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph__3__b2eaa137.png",
//             alt: "A sunlit pathway winding through a lush green sanctuary",
//           },
//         },
//         {
//           id: "contentment",
//           title: "Contentment",
//           subtitle: "Default Setting 04",
//           icon: "Leaf",
//           description: "Deep fulfillment in the now.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph_5b20a1f1.png",
//             alt: "Balanced zen stones resting in tranquil natural light",
//           },
//         },
//         {
//           id: "truth",
//           title: "Truth",
//           subtitle: "Default Setting 05",
//           icon: "Compass",
//           description: "Authentic self-expression.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph__1__befd108a.png",
//             alt: "A person meditating on a mountain summit at dawn",
//           },
//         },
//         {
//           id: "purity",
//           title: "Purity",
//           subtitle: "Default Setting 06",
//           icon: "Sparkles",
//           description: "Clear energetic container.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph__2__fe862626.png",
//             alt: "A luminous meditation silhouette in golden forest light",
//           },
//         },
//         {
//           id: "honesty",
//           title: "Honesty",
//           subtitle: "Default Setting 07",
//           icon: "Anchor",
//           description: "Radical internal integrity.",
//           image: {
//             src: "/assets/aistudio/Pillar_photograph__3__b2eaa137.png",
//             alt: "A sunlit pathway winding through a lush green sanctuary",
//           },
//         },
//       ],
//     },

//     healingFrequencies: {
//       badge: "ADVANCED BIORESONANCE",
//       title: "Frequency-Based Energy Healing Protocols",
//       description:
//         "We blend deep inner awareness with modern frequency technology to clear blockages, restore biological equilibrium, and align your energy state across specialized dimensions.",
//       note: "Wellness sessions complement, but do not replace, professional medical or mental-health care.",
//       caption:
//         "Chakra Balancing · Holistic Health · Prosperity · Cell Harmony · Prostate Harmony · Vagus · Mental Clarity · Detoxify · Negative Entities Clearance",
//       captionIcon: "Volume2",
//       cta: {
//         label: "Explore Frequencies",
//         href: "/offerings",
//       },
//       image: {
//         src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
//         alt: "Tibetan singing bowls prepared for a sound wellness session with candles and incense",
//       },
//     },

//     journeySteps: {
//       eyebrow: "BEGIN YOUR TRANSFORMATION",
//       title: "Schedule Your Free Discovery Call",
//       steps: [
//         {
//           number: "01",
//           title: "Select Protocol",
//           description:
//             "Choose your primary frequency protocol from the nine available.",
//         },
//         {
//           number: "02",
//           title: "Choose Your Date",
//           description: "Pick the preferred date for your free discovery call.",
//         },
//         {
//           number: "03",
//           title: "Share Your Intention",
//           description:
//             "Share a few words about your current intention, challenge or state of Being.",
//         },
//       ],
//     },

//     thoughtsPreview: {
//       badge: "JOURNAL & INNER INQUIRY",
//       title: "Reflections for Your Journey",
//       description:
//         "True realization arises from asking the right inner questions. Reflect deeply on where you act from.",
//       readLabel: "Read reflection",
//       cta: {
//         label: "Read All Thoughts",
//         href: "/thoughts",
//       },
//       image: {
//         src: "/assets/aistudio/program_inner_growth_1791868807800_dabf991f.jpg",
//         alt: "An open journal and warm tea arranged for mindful reflection",
//       },
//       featuredArticles: [
//         {
//           id: "at-work-peace-or-pressure",
//           slug: "at-work-peace-or-pressure",
//           tag: "CAREER & ALIGNMENT",
//           title: "At Work, Do You Act from Peace or Pressure?",
//           excerpt:
//             "If I am peace, my career decisions will be peaceful. A reflection on the state behind your decisions.",
//           readTime: "5 min read",
//           image: {
//             src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
//             alt: "A journal titled A More Conscious You in morning sunlight",
//           },
//         },
//         {
//           id: "give-love-or-ask-for-love",
//           slug: "give-love-or-ask-for-love",
//           tag: "RELATIONSHIPS & SOURCE",
//           title: "In Relationships, Do You Give Love or Ask for Love?",
//           excerpt:
//             "If I am love, my relationships will be loving. An inquiry into where love begins.",
//           readTime: "7 min read",
//           image: {
//             src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
//             alt: "Singing bowls used during a restorative sound practice",
//           },
//         },
//         {
//           id: "trustee-not-owner",
//           slug: "trustee-not-owner",
//           tag: "ABUNDANCE & WEALTH",
//           title:
//             "With Money, Are You a Trustee or Operating from Fear and Ownership?",
//           excerpt:
//             "Releasing scarcity mindsets and stepping into the role of a secure trustee of wealth.",
//           readTime: "6 min read",
//           image: {
//             src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
//             alt: "Balanced stones in sunlight with botanical leaves",
//           },
//         },
//       ],
//     },

//     finalCta: {
//       eyebrow: "BEGIN YOUR TRANSFORMATION",
//       title: "Schedule Your Free Discovery Call",
//       description:
//         "Take the first step toward aligning your energy field, clearing deep stressors, and restoring your original default state with Muazzam Abdul Rehman.",
//       primaryCta: {
//         label: CTA_LABEL,
//         href: "/contact",
//       },
//       secondaryCta: {
//         label: "Explore Offerings",
//         href: "/offerings",
//       },
//       backgroundImage: {
//         src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
//         alt: "Meditation beneath the tree of life",
//       },
//     },
//   },

//   aboutPage: {
//     id: "about",
//     path: "/about",
//     meta: {
//       title: "About Muazzam Abdul Rehman | Inner Being Wellness",
//       description:
//         "From Managing Director to bioenergetic wellness guide: discover the story behind Inner Being Wellness and the belief that fixing the Being makes the Doing follow naturally.",
//     },

//     hero: {
//       badge: "OUR ORIGIN STORY",
//       title: "From Executive Leadership to Inner Transformation",
//       subtitle: "Fix the Being first, and the Doing will naturally follow.",
//       image: {
//         src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
//         alt: "A man meditating peacefully in nature",
//       },
//     },

//     story: {
//       badge: "FOUNDER'S STORY",
//       title: "The Story of Muazzam Abdul Rehman",
//       subtitle:
//         "Managing Director, Founder & Frequency Wellness Coach Facility Management · Abu Dhabi & Dubai, UAE",
//       paragraphs: [
//         "For decades, I built my career around structure, strategy and high-level management. Academically trained with an MBA and specialised in organisational leadership, I serve as the Managing Director of Founder & Frequency Wellness Coach Facility Management across Abu Dhabi and Dubai, driving operational excellence and leading complex organisations.",
//         "Yet despite these corporate achievements, I realised that external success is only half the equation. True performance, vitality and fulfilment begin from within.",
//         "That realisation led me to NLP, EFT, Ho'oponopono, subconscious reprogramming and bioenergetic frequency work. Through Inner Being Wellness, I now guide individuals to elevate their natural state of being and achieve lasting excellence.",
//       ],
//       founderImage: {
//         src: "/assets/aistudio/image2_aedbb8dd.jpeg",
//         alt: "Portrait of Muazzam Abdul Rehman",
//       },
//       executiveImage: {
//         src: "/assets/aistudio/image2_aedbb8dd.jpeg",
//         alt: "Muazzam in professional leadership setting",
//       },
//     },

//     bridgingSection: {
//       badge: "BRIDGING LEADERSHIP, MINDSET & BIOENERGETIC HEALING",
//       title: "Harmonizing Internal State & High-Performance Living",
//       paragraphs: [
//         "Driven by a deep passion for human potential and holistic health, Muazzam transitioned into the realm of personal breakthrough. Today, he is a Certified Master NLP Practitioner, EFT & Ho'oponopono specialist and bioenergetic frequency expert, trained in subconscious reprogramming.",
//         "He recognised that just as an enterprise requires strong leadership and clear structure, human well-being depends on the harmony of our internal state: our thoughts, subconscious conditioning and bioenergetic frequencies.",
//         "This insight led to the establishment of Inner Being Wellness, where Muazzam blends strategic executive leadership with bioenergetic frequency technologies and subconscious reprogramming. His methodology helps individuals release deep-seated mental, emotional and energetic blockages, regulate the nervous system and align their energy centres for sustainable vitality.",
//       ],
//       bannerImage: {
//         src: "/assets/aistudio/Bridging_leadership_and_healing_b42efad0.png",
//         alt: "Bridging leadership, mindset and bioenergetic healing card with zen stones and botanicals",
//       },
//     },

//     transition: {
//       eyebrow: "FROM INNOCENCE TO IDENTITY CRISIS",
//       title: "As children, we simply were.",
//       paragraphs: [
//         "As children, we lived in pure presence: laughing, playing, crying and sleeping without barriers, beliefs or cultural conditioning.",
//         "As we grew, external labels were added: gender, nationality, status, career titles and societal expectations. This layering of identity created fragile egos, stress and self-sabotage.",
//       ],
//       image: {
//         src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
//         alt: "A mindful yoga practice in a warm sunlit room",
//       },
//     },

//     founderMessage: {
//       badge: "A MESSAGE FROM OUR FOUNDER",
//       quote:
//         "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving.",
//       paragraphs: [
//         "So today we don't fix career, money or relationships. We fix the BEING.",
//         "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time, and our work is to bring you back to your original state.",
//         "Through frequency-based energy healing, subconscious reprogramming and conscious awareness, we guide individuals from overwhelm towards clarity, vitality and joy.",
//       ],
//       stillLifeImage: {
//         src: "/assets/aistudio/Balancing_stones_and_botanical_leaves_cdede477.png",
//         alt: "Balanced stones and botanical leaves in tranquil light",
//       },
//     },

//     approach: {
//       eyebrow: "OUR APPROACH",
//       title: "Human touch meets modern technology.",
//       description:
//         "We blend deep inner awareness with modern frequency technology, so your journey from illness to wellness is recorded and understood, not just felt.",
//       principles: [
//         {
//           id: "personal",
//           icon: "User",
//           title: "Being-First",
//           description:
//             "We begin with who you are, not what you do, because the Doing follows the Being.",
//         },
//         {
//           id: "integrative",
//           icon: "Layers",
//           title: "Integrative",
//           description:
//             "Executive leadership principles, NLP, EFT, Ho'oponopono and frequency protocols work together.",
//         },
//         {
//           id: "grounded",
//           icon: "Anchor",
//           title: "Measured",
//           description:
//             "Pre- and post-session biofield measurement and HRV tracking give you an objective view of your progress.",
//         },
//         {
//           id: "compassionate",
//           icon: "Heart",
//           title: "Compassionate",
//           description:
//             "Personalised integration guidance rooted in ancient wisdom and modern science, without judgement or force.",
//         },
//       ],
//     },

//     // CLIENT: Vision & Mission founder page (/about) pe hi rehta hai, homepage pe nahi.
//     visionMission: {
//       title: "Our Vision & Mission",
//       subtitle:
//         "Bridging strategic leadership with bioenergetic frequency technologies.",
//       image: {
//         src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
//         alt: "Meditation beneath the tree of life",
//       },
//       vision: {
//         title: "Our Vision",
//         icon: "Sun",
//         description:
//           "To create a global community where individuals transcend subconscious limitations and bioenergetic imbalances, stepping into a state of peak health, emotional resilience and effortless prosperity.",
//       },
//       mission: {
//         title: "Our Mission",
//         icon: "Compass",
//         description:
//           "To guide individuals by bridging strategic executive leadership with bioenergetic frequency technologies and subconscious reprogramming, empowering them to elevate their natural state of being and achieve lasting excellence.",
//       },
//     },

//     values: {
//       title: "Our Original Default Settings",
//       items: [
//         { title: "Love", description: "Unconditional source resonance." },
//         { title: "Peace", description: "Unshakable inner calm." },
//         { title: "Joy", description: "Spontaneous lightness of being." },
//         { title: "Contentment", description: "Deep fulfilment in the now." },
//         { title: "Truth", description: "Authentic self-expression." },
//         { title: "Purity", description: "A clear energetic container." },
//         { title: "Honesty", description: "Radical internal integrity." },
//       ],
//     },

//     finalCta: {
//       title: "Schedule your free discovery call.",
//       description:
//         "Take the first step toward aligning your energy field, clearing deep stressors and restoring your original default state with Muazzam Abdul Rehman.",
//       cta: {
//         label: CTA_LABEL,
//         href: "/contact",
//       },
//     },
//   },

//   offeringsPage: {
//     id: "offerings",
//     path: "/offerings",
//     meta: {
//       title: "Frequency-Based Energy Healing Protocols | Inner Being Wellness",
//       description:
//         "Explore nine bioenergetic frequency protocols from Inner Being Wellness: Chakra Balancing, Holistic Health, Prosperity, Cell Harmony, Prostate Harmony, Vagus, Mental Clarity, Detoxify and Negative Entities Clearance.",
//     },

//     hero: {
//       badge: "ADVANCED BIORESONANCE",
//       title: "Frequency-Based Energy Healing Protocols",
//       description:
//         "We blend deep inner awareness with modern frequency technology to clear blockages, restore biological equilibrium, and align your energy state across specialized dimensions.",
//       primaryCta: {
//         label: "Find Your Starting Point",
//         href: "/contact",
//       },
//       secondaryCta: {
//         label: "View all protocols",
//         href: "/viewallprotocols",
//       },
//       highlight: {
//         title: "{count} frequency protocols",
//         text: "Pre- and post-session biofield measurement and HRV tracking",
//       },
//       pillars: [
//         {
//           icon: "Waves",
//           title: "Clear blockages",
//           text: "Release the mental, emotional and energetic static that holds you back.",
//         },
//         {
//           icon: "Scale",
//           title: "Restore equilibrium",
//           text: "Support the body's natural biological balance and nervous-system calm.",
//         },
//         {
//           icon: "Compass",
//           title: "Align your energy",
//           text: "Tune your energy state across specialized dimensions.",
//         },
//       ],
//       media: "image",
//       image: {
//         src: "/assets/aistudio/bioresonance-hero.jpg",
//         alt: "A woman meditating beside a laptop showing her biofield and heart-rate data, with a glowing energy-body hologram",
//       },
//     },

//     introduction: {
//       title: "Human Touch Meets Modern Technology",
//       paragraphs: [
//         "We analyse and record your journey from illness to wellness. By blending deep inner awareness with modern frequency technology, you receive an objective report of how inner alignment creates tangible real-world results.",
//         "Each journey includes pre- and post-session biofield measurement and resonance mapping, heart rate variability (HRV) and parasympathetic coherence tracking, and personalised integration guidance rooted in ancient wisdom and modern science.",
//       ],
//     },

//     services: [
//       {
//         id: "chakra-balancing",
//         eyebrow: "PROTOCOL 01 · ENERGY      CENTRES",
//         title: "Chakra Balancing Frequency",
//         shortDescription:
//           "Clears and aligns the primary energy centers (chakras) to ensure smooth life-force circulation.",
//         description:
//           "Clears and aligns the primary energy centers (chakras) to ensure smooth life-force circulation throughout the body's subtle anatomy.",
//         outcomes: [
//           "Aligned primary energy centres",
//           "Smoother life-force circulation",
//           "A balanced subtle anatomy",
//           "Greater energetic equilibrium",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
//           alt: "Singing bowls arranged for a frequency healing session",
//         },
//         cta: {
//           label: "Enquire About Chakra Balancing",
//           href: "/contact?interest=chakra-balancing",
//         },
//       },
//       {
//         id: "holistic-health",
//         eyebrow: "PROTOCOL 02 · WHOLE-BEING BALANCE",
//         title: "Holistic Health Frequency",
//         shortDescription:
//           "A comprehensive balancing frequency designed to harmonize the entire biofield.",
//         description:
//           "A comprehensive balancing frequency designed to harmonize the entire biofield, promoting overall physical, emotional, and spiritual well-being.",
//         outcomes: [
//           "A harmonised biofield",
//           "Physical well-being",
//           "Emotional well-being",
//           "Spiritual well-being",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/Balancing_stones_and_botanical_leaves_cdede477.png",
//           alt: "Balanced stones and botanical leaves in tranquil light",
//         },
//         cta: {
//           label: "Enquire About Holistic Health",
//           href: "/contact?interest=holistic-health",
//         },
//       },
//       {
//         id: "prosperity",
//         eyebrow: "PROTOCOL 03 · ABUNDANCE",
//         title: "Prosperity Frequency",
//         shortDescription:
//           "Aligns your internal energetic frequency with abundance and releases scarcity mindsets.",
//         description:
//           "Aligns your internal energetic frequency with abundance, releasing scarcity mindsets, fear around money, and positioning you as a secure trustee of wealth.",
//         outcomes: [
//           "Release of scarcity mindsets",
//           "Less fear around money",
//           "A secure trustee's relationship with wealth",
//           "Energetic alignment with abundance",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
//           alt: "Balanced stones in sunlight with botanical leaves",
//         },
//         cta: {
//           label: "Enquire About Prosperity",
//           href: "/contact?interest=prosperity",
//         },
//       },
//       {
//         id: "cell-harmony",
//         eyebrow: "PROTOCOL 04 · CELLULAR BALANCE",
//         title: "Cell Harmony Frequency",
//         shortDescription:
//           "Resonates at a cellular level to encourage regeneration and cellular communication.",
//         description:
//           "Resonates at a cellular level to encourage regeneration, cellular communication, and biological equilibrium across all bodily systems.",
//         outcomes: [
//           "Support for cellular regeneration",
//           "Encouraged cellular communication",
//           "Biological equilibrium",
//           "Harmony across all bodily systems",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/program_mind_balance_1791868807308_0c50a090.jpg",
//           alt: "A peaceful holistic wellness space with sound instruments",
//         },
//         cta: {
//           label: "Enquire About Cell Harmony",
//           href: "/contact?interest=cell-harmony",
//         },
//       },
//       {
//         id: "prostate-harmony",
//         eyebrow: "PROTOCOL 05 · TARGETED VITALITY",
//         title: "Prostate Harmony Frequency",
//         shortDescription:
//           "A targeted frequency protocol designed to support vitality and energetic flow.",
//         description:
//           "A targeted frequency protocol designed to support vitality, energetic flow, and holistic wellness in the prostate region.",
//         outcomes: [
//           "Support for vitality",
//           "Healthy energetic flow",
//           "Holistic wellness in the prostate region",
//           "A focused, targeted protocol",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
//           alt: "A calm practitioner meditating peacefully amidst mountains",
//         },
//         cta: {
//           label: "Enquire About Prostate Harmony",
//           href: "/contact?interest=prostate-harmony",
//         },
//       },
//       {
//         id: "vagus",
//         eyebrow: "PROTOCOL 06 · NERVOUS SYSTEM",
//         title: "Vagus Frequency",
//         shortDescription:
//           "Targets the vagus nerve to stimulate the parasympathetic nervous system.",
//         description:
//           "Targets the vagus nerve to stimulate the parasympathetic nervous system, shifting the body out of fight-or-flight and into deep rest, repair, and coherence.",
//         outcomes: [
//           "Parasympathetic activation",
//           "A shift out of fight-or-flight",
//           "Deep rest and repair",
//           "Greater coherence",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
//           alt: "A calm meditation practice at sunrise",
//         },
//         cta: {
//           label: "Enquire About Vagus Frequency",
//           href: "/contact?interest=vagus",
//         },
//       },
//       {
//         id: "mental-clarity",
//         eyebrow: "PROTOCOL 07 · MIND & INTUITION",
//         title: "Mental Clarity Frequency",
//         shortDescription:
//           "Clears cognitive fog, overthinking, and energetic static.",
//         description:
//           "Clears cognitive fog, overthinking, and energetic static to restore sharp focus, intuition, and aligned decision-making.",
//         outcomes: [
//           "Less cognitive fog",
//           "Less overthinking",
//           "Sharper focus and intuition",
//           "Aligned decision-making",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
//           alt: "A journal titled A More Conscious You in morning sunlight",
//         },
//         cta: {
//           label: "Enquire About Mental Clarity",
//           href: "/contact?interest=mental-clarity",
//         },
//       },
//       {
//         id: "detoxify",
//         eyebrow: "PROTOCOL 08 · RELEASE & RENEWAL",
//         title: "Detoxify Frequency",
//         shortDescription:
//           "Supports the energetic release of stored emotional toxins and heavy stressors.",
//         description:
//           "Supports the energetic release of stored emotional toxins, heavy stressors, and metabolic burdens accumulated over time.",
//         outcomes: [
//           "Release of stored emotional toxins",
//           "Relief from heavy stressors",
//           "A lighter metabolic burden",
//           "Energetic renewal",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
//           alt: "A calm sunlit room prepared for a restorative session",
//         },
//         cta: {
//           label: "Enquire About Detoxify",
//           href: "/contact?interest=detoxify",
//         },
//       },
//       {
//         id: "negative-entities-clearance",
//         eyebrow: "PROTOCOL 09 · PURITY & LIGHT",
//         title: "Negative Entities Clearance Frequency",
//         shortDescription:
//           "Clears heavy external attachments, psychic debris, and dense energetic intrusions.",
//         description:
//           "Clears heavy external attachments, psychic debris, and dense energetic intrusions to restore your natural state of purity and light.",
//         outcomes: [
//           "Clearing of heavy external attachments",
//           "Release of psychic debris",
//           "Fewer dense energetic intrusions",
//           "A restored state of purity and light",
//         ],
//         sessionFormat:
//           "Private frequency session; format confirmed after enquiry.",
//         image: {
//           src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
//           alt: "Meditation beneath the tree of life",
//         },
//         cta: {
//           label: "Enquire About Entities Clearance",
//           href: "/contact?interest=negative-entities-clearance",
//         },
//       },
//     ],

//     signatureOffering: {
//       badge: "SIGNATURE PATHWAY",
//       title: "Freedom from Resistance",
//       quote: "Fix the Being first, and the Doing will naturally follow.",
//       description:
//         "An integrative pathway combining NLP, EFT, Ho'oponopono and subconscious reprogramming with bioenergetic frequency protocols, to return you to your original default settings.",
//       image: {
//         src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
//         alt: "Meditation beneath the tree of life",
//       },
//       cta: {
//         label: "Explore Freedom from Resistance",
//         href: "/freedom-from-resistance",
//       },
//     },

//     choosingOffering: {
//       title: "Not sure which protocol to begin with?",
//       description:
//         "You do not need to choose the perfect protocol before reaching out. Share your current intention or challenge, and we can identify a suitable starting point.",
//       cta: {
//         label: "Ask for Guidance",
//         href: "/contact",
//       },
//     },

//     importantNote: {
//       title: "Important wellness note",
//       text: "Inner Being Wellness provides complementary wellbeing and educational practices. It does not diagnose, treat or replace medical, psychological or emergency care. Please consult an appropriately qualified professional for personal health concerns.",
//     },
//   },

//   freedomFromResistancePage: {
//     id: "freedom-from-resistance",
//     path: "/freedom-from-resistance",
//     meta: {
//       title: "Freedom from Resistance | Inner Being Wellness",
//       description:
//         "Fix the Being first, and the Doing will naturally follow. Coaching, subconscious reprogramming and frequency healing to return you to your original default settings.",
//     },

//     hero: {
//       badge: "CORE TEACHING & SIGNATURE OFFERING",
//       title: "Freedom from Resistance",
//       quote: "Fix the Being first, and the Doing will naturally follow.",
//       description:
//         "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So we don't fix career, money or relationships. We fix the BEING.",
//       image: {
//         src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
//         alt: "A practitioner meditating beneath the radiant Tree of Life",
//       },
//     },

//     understanding: {
//       title: "Understanding Resistance",
//       paragraphs: [
//         "As children, we lived in pure presence, without barriers, beliefs or cultural conditioning. As we grew, labels like gender, nationality, status and career titles were layered on, creating fragile egos, stress and self-sabotage.",
//         "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time, and we bring you back to your original state: Love, Peace, Joy, Contentment, Truth, Purity and Honesty.",
//       ],
//       image: {
//         src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
//         alt: "Balanced stones resting in soft sunlight with leaves",
//       },
//     },

//     signs: {
//       title: "Resistance may feel like",
//       items: [
//         "Acting from pressure instead of peace at work",
//         "Asking for love instead of giving it in relationships",
//         "Operating from fear and ownership around money",
//         "Defining yourself through labels such as status, nationality and career titles",
//         "A low internal battery that external achievements cannot recharge",
//         "Fragile ego, stress and self-sabotage",
//       ],
//     },

//     modalities: {
//       title: "How the Path Can Support You",
//       subtitle:
//         "Human touch meets modern technology: inner awareness and frequency-based healing working together.",
//       cards: [
//         {
//           id: "coaching",
//           title: "Coaching",
//           icon: "Compass",
//           color: "#EAE6F7",
//           accentColor: "#6B46C1",
//           description:
//             "Uses NLP, EFT, Ho'oponopono and subconscious reprogramming to release deep-seated mental and emotional blockages, so you act from peace instead of pressure.",
//           bulletPoints: [
//             "NLP & EFT",
//             "Ho'oponopono",
//             "Subconscious reprogramming",
//           ],
//           image: {
//             src: "/assets/aistudio/image2_aedbb8dd.jpeg",
//             alt: "A private mindful coaching session",
//           },
//         },
//         {
//           id: "frequency-healing",
//           title: "Frequency Healing",
//           icon: "Volume2",
//           color: "#E2F4EE",
//           accentColor: "#0D9488",
//           description:
//             "Bioenergetic frequency protocols that release stored stress, support the nervous system and restore a state of inner calm and balance.",
//           bulletPoints: [
//             "Chakra Balancing Frequency",
//             "Vagus Frequency",
//             "Detoxify Frequency",
//           ],
//           image: {
//             src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
//             alt: "A singing bowl used during a sound wellness session",
//           },
//         },
//         {
//           id: "synergy",
//           title: "Synergy",
//           icon: "Sparkles",
//           color: "#FEF7E6",
//           accentColor: "#D97706",
//           description:
//             "Deep inner awareness blended with modern frequency technology, so your journey from illness to wellness is recorded and understood.",
//           bulletPoints: [
//             "Pre- and post-session biofield measurement",
//             "HRV & parasympathetic coherence tracking",
//             "Personalised integration guidance",
//           ],
//           image: {
//             src: "/assets/aistudio/Balancing_stones_and_botanical_leaves_cdede477.png",
//             alt: "A peaceful stone and botanical harmony",
//           },
//         },
//       ],
//     },

//     process: {
//       title: "The Experience",
//       steps: [
//         {
//           number: "01",
//           title: "Measure",
//           description:
//             "Pre-session biofield measurement and resonance mapping establish your starting point.",
//         },
//         {
//           number: "02",
//           title: "Reprogram",
//           description:
//             "Subconscious reprogramming with NLP, EFT and Ho'oponopono releases deep-seated blockages.",
//         },
//         {
//           number: "03",
//           title: "Harmonize",
//           description:
//             "Your chosen frequency protocol aligns your energy state and supports parasympathetic coherence.",
//         },
//         {
//           number: "04",
//           title: "Integrate",
//           description:
//             "Post-session measurement and personalised integration guidance help carry results into daily life.",
//         },
//       ],
//     },

//     suitableFor: {
//       title: "This pathway may suit you if you want to",
//       items: [
//         "Fix the Being first, so that the Doing naturally follows",
//         "Act from peace rather than pressure at work",
//         "Give love in relationships rather than ask for it",
//         "Feel like a trustee of money rather than operate from fear and ownership",
//         "Decide who you want to BE this year",
//       ],
//     },

//     ctaBanner: {
//       title: "Make Space for Genuine Freedom",
//       subtitle:
//         "Take the first step toward aligning your energy field, clearing deep stressors, and restoring your original default state.",
//       primaryCta: {
//         label: "Schedule Your Free Discovery Call",
//         href: "/contact?interest=freedom-from-resistance",
//       },
//       secondaryCta: {
//         label: "View All Offerings",
//         href: "/offerings",
//       },
//       backgroundImage: {
//         src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
//         alt: "A peaceful mountain horizon in soft morning light",
//       },
//     },

//     disclaimer: {
//       title: "Please note",
//       text: "This offering is a complementary wellness experience and is not psychotherapy, medical treatment or crisis support.",
//     },
//   },

//   thoughtsPage: {
//     id: "thoughts",
//     path: "/thoughts",
//     meta: {
//       title: "Reflections for Your Journey | Inner Being Wellness",
//       description:
//         "Inner inquiries on peace and pressure, love, money and identity from Muazzam Abdul Rehman and Inner Being Wellness.",
//     },

//     hero: {
//       badge: "JOURNAL & INNER INQUIRY",
//       title: "Reflections for Your Journey",
//       description:
//         "True realization arises from asking the right inner questions. Reflect deeply on who you are being.",
//       image: {
//         src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
//         alt: "A person writing in a journal in warm natural light",
//       },
//     },

//     featuredArticle: {
//       id: "at-work-peace-or-pressure",
//       tag: "CAREER & ALIGNMENT",
//       title: "At Work, Do You Act from Peace or Pressure?",
//       subtitle: "If I am peace, my career decisions will be peaceful.",
//       excerpt:
//         "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances. This reflection returns to the root: the state you act from.",
//       readTime: "5 min read",
//       date: "October 2026",
//       image: {
//         src: "/assets/aistudio/program_inner_growth_1791868807800_dabf991f.jpg",
//         alt: "Journal with eucalyptus and tea on wooden table",
//       },
//       content: [
//         "If I am peace, my career decisions will be peaceful. When we act from pressure, even a successful decision carries the weight of the state it was made in.",
//         "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances: the role, the title, the next target. True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
//         "So today we don't fix the career. We fix the BEING, and the Doing will naturally follow.",
//         "Ask yourself honestly: at work, do I act from peace or pressure?",
//       ],
//     },

//     categories: [
//       { id: "all", label: "All Thoughts" },
//       { id: "career", label: "Career & Alignment" },
//       { id: "relationships", label: "Relationships" },
//       { id: "abundance", label: "Abundance & Wealth" },
//       { id: "identity", label: "Identity & Future" },
//     ],

//     articles: [
//       {
//         id: "article-1",
//         slug: "at-work-peace-or-pressure",
//         category: "career",
//         tag: "CAREER & ALIGNMENT",
//         title: "At Work, Do You Act from Peace or Pressure?",
//         excerpt:
//           "If I am peace, my career decisions will be peaceful. A reflection on the state behind your decisions.",
//         readTime: "5 min read",
//         date: "Oct 2026",
//         image: {
//           src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
//           alt: "A peaceful mindful journal pause in a modern workspace",
//         },
//         content: [
//           "If I am peace, my career decisions will be peaceful. When we act from pressure, even a successful decision carries the weight of the state it was made in.",
//           "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances: the role, the title, the next target. True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
//           "So today we don't fix the career. We fix the BEING, and the Doing will naturally follow.",
//           "Ask yourself honestly: at work, do I act from peace or pressure?",
//         ],
//       },
//       {
//         id: "article-2",
//         slug: "give-love-or-ask-for-love",
//         category: "relationships",
//         tag: "RELATIONSHIPS & SOURCE",
//         title: "In Relationships, Do You Give Love or Ask for Love?",
//         excerpt:
//           "If I am love, my relationships will be loving. An inquiry into where love begins.",
//         readTime: "7 min read",
//         date: "Oct 2026",
//         image: {
//           src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
//           alt: "A restorative sound bath arrangement",
//         },
//         content: [
//           "If I am love, my relationships will be loving. Love is one of our original default settings: unconditional source resonance.",
//           "As we grew, labels of status, nationality and expectation were layered onto who we are. This division created fragile egos, stress and self-sabotage, and many of us began to ask for love rather than give it.",
//           "Ask yourself honestly: in my relationships, do I give love or ask for love?",
//         ],
//       },
//       {
//         id: "article-3",
//         slug: "trustee-not-owner",
//         category: "abundance",
//         tag: "ABUNDANCE & WEALTH",
//         title:
//           "With Money, Are You a Trustee or Operating from Fear and Ownership?",
//         excerpt:
//           "Releasing scarcity mindsets and stepping into the role of a secure trustee of wealth.",
//         readTime: "6 min read",
//         date: "Sep 2026",
//         image: {
//           src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
//           alt: "Balanced stones in sunlight with leaves",
//         },
//         content: [
//           "Money often brings out scarcity mindsets and fear. When we operate from fear and ownership, wealth becomes something to defend rather than something to steward.",
//           "The Prosperity Frequency aligns your internal energetic frequency with abundance, releasing fear around money and positioning you as a secure trustee of wealth.",
//           "Ask yourself honestly: with money, do I feel like a trustee, or do I operate from fear and ownership?",
//         ],
//       },
//       {
//         id: "article-4",
//         slug: "who-do-you-want-to-be",
//         category: "identity",
//         tag: "IDENTITY & FUTURE",
//         title: "Who Do You Want to BE This Year?",
//         excerpt: "Fix the Being first, and the Doing will naturally follow.",
//         readTime: "6 min read",
//         date: "Sep 2026",
//         image: {
//           src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
//           alt: "A person reflecting quietly in nature on mountain summit",
//         },
//         content: [
//           "Most of us plan the year around what we want to do: targets, titles and milestones. Inner Being Wellness invites a different question: who do you want to BE?",
//           "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. Fix the Being first, and the Doing will naturally follow.",
//           "Ask yourself honestly: who do I want to BE this year?",
//         ],
//       },
//       {
//         id: "article-5",
//         slug: "from-innocence-to-identity-crisis",
//         category: "identity",
//         tag: "IDENTITY & FUTURE",
//         title: "From Innocence to Identity Crisis",
//         excerpt: "How the layering of labels moves us away from pure presence.",
//         readTime: "5 min read",
//         date: "Aug 2026",
//         image: {
//           src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
//           alt: "A person at sunrise in quiet reflection",
//         },
//         content: [
//           "As children, we lived in pure presence: laughing, playing, crying and sleeping without barriers, beliefs or cultural conditioning. We simply were.",
//           "As we grew, external labels were added: gender, nationality, status, career titles and societal expectations. This division created fragile egos, stress and self-sabotage.",
//           "True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
//         ],
//       },
//       {
//         id: "article-6",
//         slug: "returning-to-your-original-default-settings",
//         category: "identity",
//         tag: "IDENTITY & FUTURE",
//         title: "Returning to Your Original Default Settings",
//         excerpt:
//           "Love, Peace, Joy, Contentment, Truth, Purity and Honesty: the state we return to.",
//         readTime: "5 min read",
//         date: "Aug 2026",
//         image: {
//           src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
//           alt: "A gentle and mindful practice in peaceful sunroom",
//         },
//         content: [
//           "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time.",
//           "Our original default settings are Love (unconditional source resonance), Peace (unshakable inner calm), Joy (spontaneous lightness of being), Contentment (deep fulfillment in the now), Truth (authentic self-expression), Purity (a clear energetic container) and Honesty (radical internal integrity).",
//           "The work is to bring you back to your original state.",
//         ],
//       },
//     ],

//     newsletter: {
//       title: "Receive a quiet note for your inner journey.",
//       description:
//         "Occasional reflections on awareness, wellbeing and intentional living. No spam, no marketing noise.",
//       emailLabel: "Email address",
//       emailPlaceholder: "you@example.com",
//       consentText:
//         "By subscribing, you agree to receive reflections from Inner Being Wellness. You may unsubscribe at any time.",
//       submitLabel: "Subscribe",
//       successMessage: "Thank you. Your subscription request has been received.",
//       errorMessage: "Please enter a valid email address.",
//     },
//   },

//   contactPage: {
//     id: "contact",
//     path: "/contact",
//     meta: {
//       title: "Schedule Your Free Discovery Call | Inner Being Wellness",
//       description:
//         "Book a free discovery call or send an enquiry to Inner Being Wellness in Abu Dhabi & Dubai.",
//     },

//     hero: {
//       badge: "BEGIN YOUR TRANSFORMATION",
//       title: "Schedule Your Free Discovery Call",
//       description:
//         "Take the first step toward aligning your energy field, clearing deep stressors, and restoring your original default state with Inner Being Wellness.",
//       image: {
//         src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
//         alt: "A calm private space prepared for a wellness consultation",
//       },
//       logo: {
//         src: "/assets/aistudio/finallogo.png",
//         alt: "Inner Being Wellness logo",
//         width: 600,
//         height: 600,
//       },
//     },

//     contactOptions: [
//       {
//         id: "email",
//         icon: "Mail",
//         title: "Email",
//         value: COMMON_EMAIL,
//         href: `mailto:${COMMON_EMAIL}`,
//         description: "For session enquiries and general questions.",
//       },

//       {
//         id: "whatsapp",
//         icon: "MessageCircle",
//         title: "WhatsApp",
//         value: "+971 58 5811609",
//         href: "https://wa.me/971585811609",
//         description: "Message us for a quick response.",
//       },

//       {
//         id: "session-format",
//         icon: "Flower2",
//         title: "Location",
//         value: "Abu Dhabi & Dubai, UAE",
//         description:
//           "Online and in-person sessions, confirmed according to availability.",
//       },
//       {
//         id: "response",
//         icon: "Clock",
//         title: "Response Time",
//         value: "Same day",
//         description: "We review every enquiry with personalized care.",
//       },
//     ],

//     form: {
//       id: "contact-form",
//       title: "Schedule Your Free Discovery Call",
//       description:
//         "Complete the form below, and Inner Being Wellness will respond using the contact details you provide.",
//       fields: [
//         {
//           id: "fullName",
//           name: "fullName",
//           label: "Your Full Name",
//           type: "text",
//           placeholder: "e.g., Alex Rivers",
//           required: true,
//         },
//         {
//           id: "email",
//           name: "email",
//           label: "Email Address",
//           type: "email",
//           placeholder: "e.g., alex@innerbeing.com",
//           required: true,
//         },
//         {
//           id: "phone",
//           name: "phone",
//           label: "Phone Number (Optional)",
//           type: "tel",
//           placeholder: "Include country code (e.g. +971 50 123 4567)",
//           required: false,
//         },
//         {
//           id: "interest",
//           name: "interest",
//           label: "Service of Interest",
//           type: "select",
//           required: true,
//           options: [
//             { label: "Chakra Balancing Frequency", value: "chakra-balancing" },
//             { label: "Holistic Health Frequency", value: "holistic-health" },
//             { label: "Prosperity Frequency", value: "prosperity" },
//             { label: "Cell Harmony Frequency", value: "cell-harmony" },
//             { label: "Prostate Harmony Frequency", value: "prostate-harmony" },
//             { label: "Vagus Frequency", value: "vagus" },
//             { label: "Mental Clarity Frequency", value: "mental-clarity" },
//             { label: "Detoxify Frequency", value: "detoxify" },
//             {
//               label: "Negative Entities Clearance Frequency",
//               value: "negative-entities-clearance",
//             },
//             {
//               label: "Freedom from Resistance (Signature)",
//               value: "freedom-from-resistance",
//             },
//             {
//               label: "Founder & Leadership Coaching (Janki Ravani)",
//               value: "founder-coaching",
//             },
//             { label: "General Wellness Enquiry", value: "general-enquiry" },
//           ],
//         },
//         {
//           id: "preferredDate",
//           name: "preferredDate",
//           label: "Preferred Date",
//           type: "date",
//           required: true,
//         },
//         {
//           id: "sessionPreference",
//           name: "sessionPreference",
//           label: "Preferred Session Format",
//           type: "radio",
//           required: true,
//           options: [
//             { label: "Online", value: "online" },
//             { label: "In Person", value: "in-person" },
//             { label: "Open to either", value: "either" },
//           ],
//         },
//         {
//           id: "message",
//           name: "message",
//           label: "What is your current intention or challenge?",
//           type: "textarea",
//           placeholder: "Share a few words about your state of Being...",
//           required: true,
//         },
//       ],
//       submitButton: {
//         label: "Confirm Free Discovery Call",
//         loadingLabel: "Sending…",
//       },
//       messages: {
//         success:
//           "Thank you. Your free discovery call request has been received. We will contact you with your pre-session bio-resonance guide within two working days.",
//         error:
//           "Please verify that all required fields are filled out correctly.",
//       },
//       privacyNote:
//         "Please do not include medical records, payment details or confidential credentials in this form.",
//     },

//     expectations: {
//       title: "What happens after you enquire?",
//       steps: [
//         {
//           number: "01",
//           title: "We read your message",
//           description:
//             "Your intention, challenge and chosen protocol help us understand your unique enquiry.",
//         },
//         {
//           number: "02",
//           title: "We respond personally",
//           description:
//             "We contact you with your pre-session bio-resonance guide and available next steps.",
//         },
//         {
//           number: "03",
//           title: "You decide",
//           description:
//             "There is no obligation to continue until the protocol and approach feel entirely right for you.",
//         },
//       ],
//     },

//     safetyNotice: {
//       title: "Need urgent support?",
//       text: "Inner Being Wellness does not provide emergency or psychiatric crisis services. If you or someone else may be in immediate danger, contact your local emergency health service or crisis support provider immediately.",
//     },

//     faq: {
//       title: "Frequently Asked Questions",
//       items: [
//         {
//           id: "experience",
//           question: 'What does "Fix the Being first" mean?',
//           answer:
//             "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So we don't fix career, money or relationships. We fix the BEING, and the Doing will naturally follow.",
//         },
//         {
//           id: "online",
//           question: "What are the original default settings?",
//           answer:
//             "Love, Peace, Joy, Contentment, Truth, Purity and Honesty. When your internal battery is low, external achievements cannot truly power you up, so we bring you back to your original state.",
//         },
//         {
//           id: "choose-offering",
//           question: "What if I do not know which protocol to choose?",
//           answer:
//             "Select 'General Wellness Enquiry' on the form and share your current intention or challenge. We will recommend the most suitable starting point.",
//         },
//         {
//           id: "medical-care",
//           question: "Is this a replacement for medical or psychological care?",
//           answer:
//             "No. Inner Being Wellness provides complementary holistic education, coaching, and frequency-based modalities. It does not replace medical diagnosis, psychotherapy, or psychiatry.",
//         },
//         {
//           id: "confidentiality",
//           question: "Will my enquiry be treated privately?",
//           answer:
//             "Yes, your enquiry is strictly confidential and used solely for direct communication between you and Inner Being Wellness.",
//         },
//       ],
//     },
//   },

//   footer: {
//     brandName: "INNER BEING WELLNESS",
//     tagline: "Fix the Being first, and the Doing will naturally follow.",
//     description:
//       "Frequency-based energy healing, subconscious reprogramming and conscious awareness with Muazzam Abdul Rehman and Janki Ravani.",
//     columns: [
//       {
//         title: "Quick Links",
//         links: [
//           { label: "Home", href: "/" },
//           { label: "About Us", href: "/about" },
//           { label: "About Janki Ravani", href: "/janki" },
//           { label: "Offerings", href: "/offerings" },
//           {
//             label: "Freedom from Resistance",
//             href: "/freedom-from-resistance",
//           },
//           { label: "Original Default Settings", href: "/#four-defaults" },
//           { label: "Thoughts", href: "/thoughts" },
//           { label: "Contact", href: "/contact" },
//         ],
//       },
//       {
//         title: "Offerings",
//         links: [
//           { label: "Chakra Balancing", href: "/offerings#chakra-balancing" },
//           { label: "Holistic Health", href: "/offerings#holistic-health" },
//           { label: "Prosperity", href: "/offerings#prosperity" },
//           { label: "Cell Harmony", href: "/offerings#cell-harmony" },
//           { label: "Prostate Harmony", href: "/offerings#prostate-harmony" },
//           { label: "Vagus", href: "/offerings#vagus" },
//           { label: "Mental Clarity", href: "/offerings#mental-clarity" },
//           { label: "Detoxify", href: "/offerings#detoxify" },
//           {
//             label: "Negative Entities Clearance",
//             href: "/offerings#negative-entities-clearance",
//           },
//           {
//             label: "Freedom from Resistance",
//             href: "/freedom-from-resistance",
//           },
//         ],
//       },
//       {
//         title: "Contact",
//         details: [
//           {
//             label: "Email",
//             value: COMMON_EMAIL,
//             href: `mailto:${COMMON_EMAIL}`,
//           },
//           {
//             label: "Location",
//             value: "Abu Dhabi & Dubai, UAE",
//           },
//           {
//             label: "Session Format",
//             value: "Online & In-person by appointment",
//           },
//           {
//             label: "Response",
//             value: "same day",
//           },
//         ],
//       },
//     ],
//     copyright:
//       "© 2026 Inner Being Wellness (Muazzam Abdul Rehman). All rights reserved.",
//     legalLinks: [
//       { label: "Privacy Policy", href: "#privacy" },
//       { label: "Terms of Service", href: "#terms" },
//       { label: "Cookie Settings", href: "#cookies" },
//     ],
//     wellnessDisclaimer:
//       "Inner Being Wellness offers complementary wellbeing and educational practices. It does not provide medical diagnosis, psychotherapy or emergency services.",
//   },
// };

// export const getWhatsAppLink = (message) => {
//   const { whatsapp, whatsappMessage } = siteData.brand.contact;
//   return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message || whatsappMessage)}`;
// };
// export default siteData;







// updated code 




// updated code as per client requirement

export const COMMON_EMAIL = "hello@innerbeingwellness.com";

// CLIENT: ek hi CTA label poori site pe
export const CTA_LABEL = "Book Free Discovery Call";

export const siteData = {
  brand: {
    name: "INNER BEING WELLNESS",
    shortName: "Inner Being",
    tagline: "Fix the Being first, and the Doing will naturally follow.",
    founderName: "Muazzam Abdul Rehman",
    founderTitle:
      "Managing Director, Founder & Frequency Wellness Coach Facility Management",
    logoText: "IBW",
    // CLIENT: transparent SVG milte hi sirf yeh path badalna hai
    logoImage: "/assets/aistudio/finallogo.png",
    contact: {
      email: COMMON_EMAIL,
      // CLIENT: Muazzam se number aate hi bharna (WhatsApp ke liye)
      phone: "",
      whatsapp: "971585811609",
      whatsappDisplay: "+971 58 5811609",
      whatsappMessage:
        "Hello Inner Being Wellness, I would like to know more about a free discovery call.",
      responseTime: "We aim to respond within two working days.",
      serviceMode:
        "Private frequency sessions and bioenergetic wellness guidance",
      sessionFormat:
        "Abu Dhabi & Dubai, UAE. Online and in-person sessions, subject to availability",
    },
    socialLinks: [
      { name: "Instagram", href: "https://instagram.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
      { name: "YouTube", href: "https://youtube.com" },
    ],
  },

  siteSettings: {
    language: "en",
    locale: "en-US",
    themeColor: "#2D1C59",
    backgroundColor: "#FBF9F5",
  },

  /**
   * Design tokens used by HomePage (purple + teal + gold on off-white).
   * CLIENT: globals.css ke brand tokens ke saath match kiya (consistent colors).
   */
  theme: {
    primary: "#2D1C59",
    secondary: "#0E6E6B",
    gold: "#C5A265",
    goldLight: "#F3CF63",
    ink: "#445064",
    muted: "#7A8599",
    surface: "#FBF9F5",
    surfaceAlt: "#F3EFE6",
    card: "#FFFFFF",
    dark: "#231754",
    line: "rgba(45, 28, 89, 0.10)",
  },

  navigation: {
    headerLinks: [
      { label: "Home", href: "/", id: "home" },
      {
        label: "About Us",
        href: "/about",
        id: "about",
        children: [
          { label: "About Muazzam Abdul Rehman", href: "/about" },
          { label: "About Janki Ravani", href: "/janki" },
        ],
      },
      { label: "Offerings", href: "/offerings", id: "offerings" },
      {
        label: "Freedom from Resistance",
        href: "/freedom-from-resistance",
        id: "freedom-from-resistance",
      },
      { label: "Thoughts", href: "/thoughts", id: "thoughts" },
      { label: "Contact", href: "/contact", id: "contact" },
    ],
    ctaButton: {
      label: CTA_LABEL,
      href: "/contact",
      action: "scrollToContactForm",
    },
  },

  /**
   * Landing page nav: Home, Manifesto, Founder, Defaults, Frequencies, Reflections.
   * "#id" hrefs match homePage.sectionIds.
   */
  landingNav: {
    links: [
      { label: "Home", href: "#home", id: "home" },
      { label: "Manifesto", href: "#manifesto", id: "manifesto" },
      {
        label: "Founder",
        href: "#founder",
        id: "founder",
        children: [
          { label: "About Muazzam Abdul Rehman", href: "/about" },
          { label: "About Janki Ravani", href: "/janki" },
        ],
      },
      { label: "Defaults", href: "#four-defaults", id: "four-defaults" },
      { label: "Frequencies", href: "#frequencies", id: "frequencies" },
      { label: "Reflections", href: "#reflections", id: "reflections" },
    ],
    cta: { label: CTA_LABEL, href: "/contact" },
  },

  homePage: {
    id: "home",
    path: "/",
    meta: {
      title: "Inner Being Wellness | Fix the Being First",
      description:
        "Frequency-based energy healing, subconscious reprogramming and conscious awareness with Muazzam Abdul Rehman in Abu Dhabi & Dubai. Fix the Being first, and the Doing will naturally follow.",
    },

    sectionIds: {
      hero: "home",
      introduction: "introduction",
      manifesto: "manifesto",
      founder: "founder",
      defaults: "four-defaults",
      frequencies: "frequencies",
      journey: "journey",
      reflections: "reflections",
      contact: "begin",
    },

    hero: {
      badge: "INNER BEING WELLNESS • ABU DHABI & DUBAI",
      titleLines: [
        { text: "Fix the Being first,", tone: "primary" },
        { text: "and the Doing will naturally follow.", tone: "secondary" },
      ],
      description:
        "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So today we don't fix career, money, or relationships—we fix the BEING.",
      primaryCta: { label: CTA_LABEL, href: "/contact#contact-form" },
      secondaryCta: null,
      botanicalBorder: null, // leaf removed

      // Naya photo aate hi sirf src badalna
      image: {
        src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
        alt: "A woman meditating at sunrise on a mountain overlook beneath an old tree",
      },
      // Janki intro video (hero, right side)
      video: {
        enabled: true,
        src: "/assets/videos/inner being (1).mp4",
        poster: "",
        loop: true,
        muted: true,
        allowFullscreen: true,
      },
      tagline: "Your frequency is your new currency, waiting to be encashed!",
      taglineShort: "Encash your frequency.",

      founder: {
        name: "Janki Ravani",
        title: "Co-Founder & Chief Happiness Coach",
        badges: ["TEDx Speaker", "Global Happiness Leader"],
        ctaNote: "Free discovery call · No obligation",
      },

      highlights: [
        {
          id: "clear-mind",
          label: "Mental Clarity",
          icon: "Lotus",
          description: "Clears cognitive fog and overthinking",
        },
        {
          id: "emotional-balance",
          label: "Emotional Resilience",
          icon: "Heart",
          description: "Releases stress stored over time",
        },
        {
          id: "aligned-energy",
          label: "Aligned Energy",
          icon: "Sun",
          description: "Chakra balancing and biofield harmony",
        },
      ],
    },

    // Hero ke neeche wide video section
    videoSection: {
      id: "intro-video",
      eyebrow: "WATCH THE INTRODUCTION",
      title: "Meet Inner Being Wellness",
      description:
        "A short introduction to the philosophy behind our work: fix the Being first, and the Doing will naturally follow.",
      caption: "Introduction · approx. 1 min",
      video: {
        src: "/assets/videos/intro.mp4",
        poster: "/assets/videos/intro-poster.jpg",
        loop: true, // true = end screen ke baad auto replay
        muted: true,
        autoPlay: true,
        allowFullscreen: true,
      },
      // Video khatam hone pe dikhne wala end screen
      endScreen: {
        enabled: true,
        eyebrow: "THANK YOU FOR WATCHING",
        title: "Ready to fix the Being first?",
        replayDelay: 6, // seconds ke baad auto replay (5-6 rakh sakti ho)
        primary: {
          label: "Book Discovery Call",
          href: "/contact#contact-form",
        },
        secondary: { label: "View Website", href: "#manifesto" },
      },
      ctas: [
        { label: "Learn more", href: "/about", variant: "secondary" },
        { label: CTA_LABEL, href: "/contact#contact-form", variant: "primary" },
      ],
    },

    // Healy / film section. Videos: public/assets/videos/video1.mp4, video2.mp4, video3.mp4
    filmSection: {
      id: "film",
      eyebrow: "AS FEATURED IN THE FILM",
      title: "Healy in “Frequencies: The Paradigm Shift”",
      description:
        "Healy is the main instrument we use in our coaching, and it is featured in the film Frequencies: The Paradigm Shift. Here is a glimpse from the film, which is releasing worldwide, bringing the conversation about frequencies to a wider audience.",

      releaseNote: "Releasing worldwide in just a couple of days",

    
  videos: [
        {
          src: "/assets/videos/Sequence 21.mp4",
          title: "Healy in the film, clip 1",
        },
        {
          src: "/assets/videos/video 2.mp4",
          title: "Healy in the film, clip 2",
        },
        {
          src: "/assets/videos/video 3.mp4",
          title: "Healy in the film, clip 3",
        },
      ],


      question:
        "You've been curious about Healy for a while… what's stopping you from exploring it for yourself?",

      subtext:
        "Come for a free discovery call, clear your questions and see for yourself.",

      note: "Wellness sessions complement, but do not replace, professional medical or mental-health care.",

      cta: {
        label: CTA_LABEL,
        href: "/contact#contact-form",
      },
    },

    introduction: {
      eyebrow: "THE EVOLUTIONARY PATH",
      title: "From Innocence to Identity Crisis",
      paragraphs: [
        "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances. True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
        "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time, and we bring you back to your original state.",
      ],
      cta: {
        label: "Learn Our Philosophy",
        href: "/about",
      },
      image: {
        src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
        alt: "A calm practitioner meditating peacefully amidst mountains",
      },
    },

    manifesto: {
      ornament: "Lotus",
      eyebrow: null,
      title: "Our Manifesto",
      subtitle: "Fix the BEING, and the Doing will naturally follow.",
      pillars: [
        {
          id: "awareness",
          title: "As Children",
          icon: "Leaf",
          color: "#D9F0EE",
          accentColor: "#1F7A78",
          description:
            "We lived in pure presence, without barriers, beliefs or cultural conditioning. We simply were.",
        },
        {
          id: "healing",
          title: "Layered Identity",
          icon: "Lotus",
          color: "#E6DDFB",
          accentColor: "#5B2FC2",
          description:
            "Labels of gender, nationality, status and career created fragile egos, stress and self-sabotage.",
        },
        {
          id: "balance",
          title: "Peace",
          icon: "Sun",
          color: "#FDE9C4",
          accentColor: "#E08E12",
          description: "If I am peace, my career decisions will be peaceful.",
        },
        {
          id: "freedom",
          title: "Love",
          icon: "Heart",
          color: "#FADBD3",
          accentColor: "#B8683A",
          description: "If I am love, my relationships will be loving.",
        },
      ],
    },

    // CLIENT: About Me content kam kiya. Chhoti intro + bullets (scan karna aasan).
    // Poori story /about page pe hai. Component mein `bullets` render karna.
    founderSpotlight: {
      badge: "ABOUT THE FOUNDER",
      name: "Muazzam Abdul Rehman",
      subtitle: "From Executive Leadership to Inner Transformation",
      paragraphs: [
        "External success is only half the equation: true performance, vitality, and fulfillment begin from within.",
      ],
      bullets: [
        "MBA, specialized in organizational leadership",
        "Managing Director, Founder & Frequency Wellness Coach Facility Management (Abu Dhabi & Dubai)",
        "Certified Master NLP Practitioner",
        "EFT & Ho'oponopono Specialist",
        "Bioenergetic Frequency Expert in Subconscious Reprogramming",
      ],
      cta: {
        label: "Read the Full Story",
        href: "/about",
      },
      image: {
        src: "/assets/aistudio/image2_aedbb8dd.jpeg",
        alt: "Muazzam Abdul Rehman seated calmly in a serene garden",
      },
      portraitImage: {
        src: "/assets/aistudio/image2_aedbb8dd.jpeg",
        alt: "Muazzam Abdul Rehman portrait",
      },
    },

    fourDefaults: {
      id: "four-defaults",
      eyebrow: "BIO-ENERGETIC RESET",
      title: "Returning to Your Original Default Settings",
      subtitle:
        "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time. We bring you back to your original state.",
      // CLIENT: homepage pe sirf itne cards dikhao, baaki "Explore" / full view link se.
      // Component: cards.slice(0, homeVisibleCount)
      homeVisibleCount: 4,
      fullViewCta: {
        label: "View all default settings",
        href: "/offerings",
      },
      cardCta: {
        label: "Explore this practice",
        href: "/offerings",
      },
      cards: [
        {
          id: "love",
          title: "Love",
          subtitle: "Default Setting 01",
          icon: "Heart",
          description: "Unconditional source resonance.",
          image: {
            src: "/assets/aistudio/Pillar_photograph__1__befd108a.png",
            alt: "A person meditating on a mountain summit at dawn",
          },
        },
        {
          id: "peace",
          title: "Peace",
          subtitle: "Default Setting 02",
          icon: "Flower2",
          description: "Unshakable inner calm.",
          image: {
            src: "/assets/aistudio/Pillar_photograph__2__fe862626.png",
            alt: "A luminous meditation silhouette in golden forest light",
          },
        },
        {
          id: "joy",
          title: "Joy",
          subtitle: "Default Setting 03",
          icon: "Sun",
          description: "Spontaneous lightness of being.",
          image: {
            src: "/assets/aistudio/Pillar_photograph__3__b2eaa137.png",
            alt: "A sunlit pathway winding through a lush green sanctuary",
          },
        },
        {
          id: "contentment",
          title: "Contentment",
          subtitle: "Default Setting 04",
          icon: "Leaf",
          description: "Deep fulfillment in the now.",
          image: {
            src: "/assets/aistudio/Pillar_photograph_5b20a1f1.png",
            alt: "Balanced zen stones resting in tranquil natural light",
          },
        },
        {
          id: "truth",
          title: "Truth",
          subtitle: "Default Setting 05",
          icon: "Compass",
          description: "Authentic self-expression.",
          image: {
            src: "/assets/aistudio/Pillar_photograph__1__befd108a.png",
            alt: "A person meditating on a mountain summit at dawn",
          },
        },
        {
          id: "purity",
          title: "Purity",
          subtitle: "Default Setting 06",
          icon: "Sparkles",
          description: "Clear energetic container.",
          image: {
            src: "/assets/aistudio/Pillar_photograph__2__fe862626.png",
            alt: "A luminous meditation silhouette in golden forest light",
          },
        },
        {
          id: "honesty",
          title: "Honesty",
          subtitle: "Default Setting 07",
          icon: "Anchor",
          description: "Radical internal integrity.",
          image: {
            src: "/assets/aistudio/Pillar_photograph__3__b2eaa137.png",
            alt: "A sunlit pathway winding through a lush green sanctuary",
          },
        },
      ],
    },

    healingFrequencies: {
      badge: "ADVANCED BIORESONANCE",
      title: "Frequency-Based Energy Healing Protocols",
      description:
        "We blend deep inner awareness with modern frequency technology to clear blockages, restore biological equilibrium, and align your energy state across specialized dimensions.",
      note: "Wellness sessions complement, but do not replace, professional medical or mental-health care.",
      caption:
        "Chakra Balancing · Holistic Health · Prosperity · Cell Harmony · Prostate Harmony · Vagus · Mental Clarity · Detoxify · Negative Entities Clearance",
      captionIcon: "Volume2",
      cta: {
        label: "Explore Frequencies",
        href: "/offerings",
      },
      image: {
        src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
        alt: "Tibetan singing bowls prepared for a sound wellness session with candles and incense",
      },
    },

    journeySteps: {
      eyebrow: "BEGIN YOUR TRANSFORMATION",
      title: "Schedule Your Free Discovery Call",
      steps: [
        {
          number: "01",
          title: "Select Protocol",
          description:
            "Choose your primary frequency protocol from the nine available.",
        },
        {
          number: "02",
          title: "Choose Your Date",
          description: "Pick the preferred date for your free discovery call.",
        },
        {
          number: "03",
          title: "Share Your Intention",
          description:
            "Share a few words about your current intention, challenge or state of Being.",
        },
      ],
    },

    thoughtsPreview: {
      badge: "JOURNAL & INNER INQUIRY",
      title: "Reflections for Your Journey",
      description:
        "True realization arises from asking the right inner questions. Reflect deeply on where you act from.",
      readLabel: "Read reflection",
      cta: {
        label: "Read All Thoughts",
        href: "/thoughts",
      },
      image: {
        src: "/assets/aistudio/program_inner_growth_1791868807800_dabf991f.jpg",
        alt: "An open journal and warm tea arranged for mindful reflection",
      },
      featuredArticles: [
        {
          id: "at-work-peace-or-pressure",
          slug: "at-work-peace-or-pressure",
          tag: "CAREER & ALIGNMENT",
          title: "At Work, Do You Act from Peace or Pressure?",
          excerpt:
            "If I am peace, my career decisions will be peaceful. A reflection on the state behind your decisions.",
          readTime: "5 min read",
          image: {
            src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
            alt: "A journal titled A More Conscious You in morning sunlight",
          },
        },
        {
          id: "give-love-or-ask-for-love",
          slug: "give-love-or-ask-for-love",
          tag: "RELATIONSHIPS & SOURCE",
          title: "In Relationships, Do You Give Love or Ask for Love?",
          excerpt:
            "If I am love, my relationships will be loving. An inquiry into where love begins.",
          readTime: "7 min read",
          image: {
            src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
            alt: "Singing bowls used during a restorative sound practice",
          },
        },
        {
          id: "trustee-not-owner",
          slug: "trustee-not-owner",
          tag: "ABUNDANCE & WEALTH",
          title:
            "With Money, Are You a Trustee or Operating from Fear and Ownership?",
          excerpt:
            "Releasing scarcity mindsets and stepping into the role of a secure trustee of wealth.",
          readTime: "6 min read",
          image: {
            src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
            alt: "Balanced stones in sunlight with botanical leaves",
          },
        },
      ],
    },

    finalCta: {
      eyebrow: "BEGIN YOUR TRANSFORMATION",
      title: "Schedule Your Free Discovery Call",
      description:
        "Take the first step toward aligning your energy field, clearing deep stressors, and restoring your original default state with Muazzam Abdul Rehman.",
      primaryCta: {
        label: CTA_LABEL,
        href: "/contact",
      },
      secondaryCta: {
        label: "Explore Offerings",
        href: "/offerings",
      },
      backgroundImage: {
        src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
        alt: "Meditation beneath the tree of life",
      },
    },
  },

  aboutPage: {
    id: "about",
    path: "/about",
    meta: {
      title: "About Muazzam Abdul Rehman | Inner Being Wellness",
      description:
        "From Managing Director to bioenergetic wellness guide: discover the story behind Inner Being Wellness and the belief that fixing the Being makes the Doing follow naturally.",
    },

    hero: {
      badge: "OUR ORIGIN STORY",
      title: "From Executive Leadership to Inner Transformation",
      subtitle: "Fix the Being first, and the Doing will naturally follow.",
      image: {
        src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
        alt: "A man meditating peacefully in nature",
      },
    },

    story: {
      badge: "FOUNDER'S STORY",
      title: "The Story of Muazzam Abdul Rehman",
      subtitle:
        "Managing Director, Founder & Frequency Wellness Coach Facility Management · Abu Dhabi & Dubai, UAE",
      paragraphs: [
        "For decades, I built my career around structure, strategy and high-level management. Academically trained with an MBA and specialised in organisational leadership, I serve as the Managing Director of Founder & Frequency Wellness Coach Facility Management across Abu Dhabi and Dubai, driving operational excellence and leading complex organisations.",
        "Yet despite these corporate achievements, I realised that external success is only half the equation. True performance, vitality and fulfilment begin from within.",
        "That realisation led me to NLP, EFT, Ho'oponopono, subconscious reprogramming and bioenergetic frequency work. Through Inner Being Wellness, I now guide individuals to elevate their natural state of being and achieve lasting excellence.",
      ],
      founderImage: {
        src: "/assets/aistudio/image2_aedbb8dd.jpeg",
        alt: "Portrait of Muazzam Abdul Rehman",
      },
      executiveImage: {
        src: "/assets/aistudio/image2_aedbb8dd.jpeg",
        alt: "Muazzam in professional leadership setting",
      },
    },

    bridgingSection: {
      badge: "BRIDGING LEADERSHIP, MINDSET & BIOENERGETIC HEALING",
      title: "Harmonizing Internal State & High-Performance Living",
      paragraphs: [
        "Driven by a deep passion for human potential and holistic health, Muazzam transitioned into the realm of personal breakthrough. Today, he is a Certified Master NLP Practitioner, EFT & Ho'oponopono specialist and bioenergetic frequency expert, trained in subconscious reprogramming.",
        "He recognised that just as an enterprise requires strong leadership and clear structure, human well-being depends on the harmony of our internal state: our thoughts, subconscious conditioning and bioenergetic frequencies.",
        "This insight led to the establishment of Inner Being Wellness, where Muazzam blends strategic executive leadership with bioenergetic frequency technologies and subconscious reprogramming. His methodology helps individuals release deep-seated mental, emotional and energetic blockages, regulate the nervous system and align their energy centres for sustainable vitality.",
      ],
      bannerImage: {
        src: "/assets/aistudio/Bridging_leadership_and_healing_b42efad0.png",
        alt: "Bridging leadership, mindset and bioenergetic healing card with zen stones and botanicals",
      },
    },

    transition: {
      eyebrow: "FROM INNOCENCE TO IDENTITY CRISIS",
      title: "As children, we simply were.",
      paragraphs: [
        "As children, we lived in pure presence: laughing, playing, crying and sleeping without barriers, beliefs or cultural conditioning.",
        "As we grew, external labels were added: gender, nationality, status, career titles and societal expectations. This layering of identity created fragile egos, stress and self-sabotage.",
      ],
      image: {
        src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
        alt: "A mindful yoga practice in a warm sunlit room",
      },
    },

    founderMessage: {
      badge: "A MESSAGE FROM OUR FOUNDER",
      quote:
        "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving.",
      paragraphs: [
        "So today we don't fix career, money or relationships. We fix the BEING.",
        "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time, and our work is to bring you back to your original state.",
        "Through frequency-based energy healing, subconscious reprogramming and conscious awareness, we guide individuals from overwhelm towards clarity, vitality and joy.",
      ],
      stillLifeImage: {
        src: "/assets/aistudio/Balancing_stones_and_botanical_leaves_cdede477.png",
        alt: "Balanced stones and botanical leaves in tranquil light",
      },
    },

    approach: {
      eyebrow: "OUR APPROACH",
      title: "Human touch meets modern technology.",
      description:
        "We blend deep inner awareness with modern frequency technology, so your journey from illness to wellness is recorded and understood, not just felt.",
      principles: [
        {
          id: "personal",
          icon: "User",
          title: "Being-First",
          description:
            "We begin with who you are, not what you do, because the Doing follows the Being.",
        },
        {
          id: "integrative",
          icon: "Layers",
          title: "Integrative",
          description:
            "Executive leadership principles, NLP, EFT, Ho'oponopono and frequency protocols work together.",
        },
        {
          id: "grounded",
          icon: "Anchor",
          title: "Measured",
          description:
            "Pre- and post-session biofield measurement and HRV tracking give you an objective view of your progress.",
        },
        {
          id: "compassionate",
          icon: "Heart",
          title: "Compassionate",
          description:
            "Personalised integration guidance rooted in ancient wisdom and modern science, without judgement or force.",
        },
      ],
    },

    // CLIENT: Vision & Mission founder page (/about) pe hi rehta hai, homepage pe nahi.
    visionMission: {
      title: "Our Vision & Mission",
      subtitle:
        "Bridging strategic leadership with bioenergetic frequency technologies.",
      image: {
        src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
        alt: "Meditation beneath the tree of life",
      },
      vision: {
        title: "Our Vision",
        icon: "Sun",
        description:
          "To create a global community where individuals transcend subconscious limitations and bioenergetic imbalances, stepping into a state of peak health, emotional resilience and effortless prosperity.",
      },
      mission: {
        title: "Our Mission",
        icon: "Compass",
        description:
          "To guide individuals by bridging strategic executive leadership with bioenergetic frequency technologies and subconscious reprogramming, empowering them to elevate their natural state of being and achieve lasting excellence.",
      },
    },

    values: {
      title: "Our Original Default Settings",
      items: [
        { title: "Love", description: "Unconditional source resonance." },
        { title: "Peace", description: "Unshakable inner calm." },
        { title: "Joy", description: "Spontaneous lightness of being." },
        { title: "Contentment", description: "Deep fulfilment in the now." },
        { title: "Truth", description: "Authentic self-expression." },
        { title: "Purity", description: "A clear energetic container." },
        { title: "Honesty", description: "Radical internal integrity." },
      ],
    },

    finalCta: {
      title: "Schedule your free discovery call.",
      description:
        "Take the first step toward aligning your energy field, clearing deep stressors and restoring your original default state with Muazzam Abdul Rehman.",
      cta: {
        label: CTA_LABEL,
        href: "/contact",
      },
    },
  },

  offeringsPage: {
    id: "offerings",
    path: "/offerings",
    meta: {
      title: "Frequency-Based Energy Healing Protocols | Inner Being Wellness",
      description:
        "Explore nine bioenergetic frequency protocols from Inner Being Wellness: Chakra Balancing, Holistic Health, Prosperity, Cell Harmony, Prostate Harmony, Vagus, Mental Clarity, Detoxify and Negative Entities Clearance.",
    },

    hero: {
      badge: "ADVANCED BIORESONANCE",
      title: "Frequency-Based Energy Healing Protocols",
      description:
        "We blend deep inner awareness with modern frequency technology to clear blockages, restore biological equilibrium, and align your energy state across specialized dimensions.",
      primaryCta: {
        label: "Find Your Starting Point",
        href: "/contact",
      },
      secondaryCta: {
        label: "View all protocols",
        href: "/viewallprotocols",
      },
      highlight: {
        title: "{count} frequency protocols",
        text: "Pre- and post-session biofield measurement and HRV tracking",
      },
      pillars: [
        {
          icon: "Waves",
          title: "Clear blockages",
          text: "Release the mental, emotional and energetic static that holds you back.",
        },
        {
          icon: "Scale",
          title: "Restore equilibrium",
          text: "Support the body's natural biological balance and nervous-system calm.",
        },
        {
          icon: "Compass",
          title: "Align your energy",
          text: "Tune your energy state across specialized dimensions.",
        },
      ],
      media: "image",
      image: {
        src: "/assets/aistudio/bioresonance-hero.jpg",
        alt: "A woman meditating beside a laptop showing her biofield and heart-rate data, with a glowing energy-body hologram",
      },
    },

    introduction: {
      title: "Human Touch Meets Modern Technology",
      paragraphs: [
        "We analyse and record your journey from illness to wellness. By blending deep inner awareness with modern frequency technology, you receive an objective report of how inner alignment creates tangible real-world results.",
        "Each journey includes pre- and post-session biofield measurement and resonance mapping, heart rate variability (HRV) and parasympathetic coherence tracking, and personalised integration guidance rooted in ancient wisdom and modern science.",
      ],
    },

    services: [
      {
        id: "chakra-balancing",
        eyebrow: "PROTOCOL 01 · ENERGY      CENTRES",
        title: "Chakra Balancing Frequency",
        shortDescription:
          "Clears and aligns the primary energy centers (chakras) to ensure smooth life-force circulation.",
        description:
          "Clears and aligns the primary energy centers (chakras) to ensure smooth life-force circulation throughout the body's subtle anatomy.",
        outcomes: [
          "Aligned primary energy centres",
          "Smoother life-force circulation",
          "A balanced subtle anatomy",
          "Greater energetic equilibrium",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
          alt: "Singing bowls arranged for a frequency healing session",
        },
        cta: {
          label: "Enquire About Chakra Balancing",
          href: "/contact?interest=chakra-balancing",
        },
      },
      {
        id: "holistic-health",
        eyebrow: "PROTOCOL 02 · WHOLE-BEING BALANCE",
        title: "Holistic Health Frequency",
        shortDescription:
          "A comprehensive balancing frequency designed to harmonize the entire biofield.",
        description:
          "A comprehensive balancing frequency designed to harmonize the entire biofield, promoting overall physical, emotional, and spiritual well-being.",
        outcomes: [
          "A harmonised biofield",
          "Physical well-being",
          "Emotional well-being",
          "Spiritual well-being",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/Balancing_stones_and_botanical_leaves_cdede477.png",
          alt: "Balanced stones and botanical leaves in tranquil light",
        },
        cta: {
          label: "Enquire About Holistic Health",
          href: "/contact?interest=holistic-health",
        },
      },
      {
        id: "prosperity",
        eyebrow: "PROTOCOL 03 · ABUNDANCE",
        title: "Prosperity Frequency",
        shortDescription:
          "Aligns your internal energetic frequency with abundance and releases scarcity mindsets.",
        description:
          "Aligns your internal energetic frequency with abundance, releasing scarcity mindsets, fear around money, and positioning you as a secure trustee of wealth.",
        outcomes: [
          "Release of scarcity mindsets",
          "Less fear around money",
          "A secure trustee's relationship with wealth",
          "Energetic alignment with abundance",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
          alt: "Balanced stones in sunlight with botanical leaves",
        },
        cta: {
          label: "Enquire About Prosperity",
          href: "/contact?interest=prosperity",
        },
      },
      {
        id: "cell-harmony",
        eyebrow: "PROTOCOL 04 · CELLULAR BALANCE",
        title: "Cell Harmony Frequency",
        shortDescription:
          "Resonates at a cellular level to encourage regeneration and cellular communication.",
        description:
          "Resonates at a cellular level to encourage regeneration, cellular communication, and biological equilibrium across all bodily systems.",
        outcomes: [
          "Support for cellular regeneration",
          "Encouraged cellular communication",
          "Biological equilibrium",
          "Harmony across all bodily systems",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/program_mind_balance_1791868807308_0c50a090.jpg",
          alt: "A peaceful holistic wellness space with sound instruments",
        },
        cta: {
          label: "Enquire About Cell Harmony",
          href: "/contact?interest=cell-harmony",
        },
      },
      {
        id: "prostate-harmony",
        eyebrow: "PROTOCOL 05 · TARGETED VITALITY",
        title: "Prostate Harmony Frequency",
        shortDescription:
          "A targeted frequency protocol designed to support vitality and energetic flow.",
        description:
          "A targeted frequency protocol designed to support vitality, energetic flow, and holistic wellness in the prostate region.",
        outcomes: [
          "Support for vitality",
          "Healthy energetic flow",
          "Holistic wellness in the prostate region",
          "A focused, targeted protocol",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
          alt: "A calm practitioner meditating peacefully amidst mountains",
        },
        cta: {
          label: "Enquire About Prostate Harmony",
          href: "/contact?interest=prostate-harmony",
        },
      },
      {
        id: "vagus",
        eyebrow: "PROTOCOL 06 · NERVOUS SYSTEM",
        title: "Vagus Frequency",
        shortDescription:
          "Targets the vagus nerve to stimulate the parasympathetic nervous system.",
        description:
          "Targets the vagus nerve to stimulate the parasympathetic nervous system, shifting the body out of fight-or-flight and into deep rest, repair, and coherence.",
        outcomes: [
          "Parasympathetic activation",
          "A shift out of fight-or-flight",
          "Deep rest and repair",
          "Greater coherence",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
          alt: "A calm meditation practice at sunrise",
        },
        cta: {
          label: "Enquire About Vagus Frequency",
          href: "/contact?interest=vagus",
        },
      },
      {
        id: "mental-clarity",
        eyebrow: "PROTOCOL 07 · MIND & INTUITION",
        title: "Mental Clarity Frequency",
        shortDescription:
          "Clears cognitive fog, overthinking, and energetic static.",
        description:
          "Clears cognitive fog, overthinking, and energetic static to restore sharp focus, intuition, and aligned decision-making.",
        outcomes: [
          "Less cognitive fog",
          "Less overthinking",
          "Sharper focus and intuition",
          "Aligned decision-making",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
          alt: "A journal titled A More Conscious You in morning sunlight",
        },
        cta: {
          label: "Enquire About Mental Clarity",
          href: "/contact?interest=mental-clarity",
        },
      },
      {
        id: "detoxify",
        eyebrow: "PROTOCOL 08 · RELEASE & RENEWAL",
        title: "Detoxify Frequency",
        shortDescription:
          "Supports the energetic release of stored emotional toxins and heavy stressors.",
        description:
          "Supports the energetic release of stored emotional toxins, heavy stressors, and metabolic burdens accumulated over time.",
        outcomes: [
          "Release of stored emotional toxins",
          "Relief from heavy stressors",
          "A lighter metabolic burden",
          "Energetic renewal",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
          alt: "A calm sunlit room prepared for a restorative session",
        },
        cta: {
          label: "Enquire About Detoxify",
          href: "/contact?interest=detoxify",
        },
      },
      {
        id: "negative-entities-clearance",
        eyebrow: "PROTOCOL 09 · PURITY & LIGHT",
        title: "Negative Entities Clearance Frequency",
        shortDescription:
          "Clears heavy external attachments, psychic debris, and dense energetic intrusions.",
        description:
          "Clears heavy external attachments, psychic debris, and dense energetic intrusions to restore your natural state of purity and light.",
        outcomes: [
          "Clearing of heavy external attachments",
          "Release of psychic debris",
          "Fewer dense energetic intrusions",
          "A restored state of purity and light",
        ],
        sessionFormat:
          "Private frequency session; format confirmed after enquiry.",
        image: {
          src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
          alt: "Meditation beneath the tree of life",
        },
        cta: {
          label: "Enquire About Entities Clearance",
          href: "/contact?interest=negative-entities-clearance",
        },
      },
    ],

    signatureOffering: {
      badge: "SIGNATURE PATHWAY",
      title: "Freedom from Resistance",
      quote: "Fix the Being first, and the Doing will naturally follow.",
      description:
        "An integrative pathway combining NLP, EFT, Ho'oponopono and subconscious reprogramming with bioenergetic frequency protocols, to return you to your original default settings.",
      image: {
        src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
        alt: "Meditation beneath the tree of life",
      },
      cta: {
        label: "Explore Freedom from Resistance",
        href: "/freedom-from-resistance",
      },
    },

    choosingOffering: {
      title: "Not sure which protocol to begin with?",
      description:
        "You do not need to choose the perfect protocol before reaching out. Share your current intention or challenge, and we can identify a suitable starting point.",
      cta: {
        label: "Ask for Guidance",
        href: "/contact",
      },
    },

    importantNote: {
      title: "Important wellness note",
      text: "Inner Being Wellness provides complementary wellbeing and educational practices. It does not diagnose, treat or replace medical, psychological or emergency care. Please consult an appropriately qualified professional for personal health concerns.",
    },
  },

  freedomFromResistancePage: {
    id: "freedom-from-resistance",
    path: "/freedom-from-resistance",
    meta: {
      title: "Freedom from Resistance | Inner Being Wellness",
      description:
        "Fix the Being first, and the Doing will naturally follow. Coaching, subconscious reprogramming and frequency healing to return you to your original default settings.",
    },

    hero: {
      badge: "CORE TEACHING & SIGNATURE OFFERING",
      title: "Freedom from Resistance",
      quote: "Fix the Being first, and the Doing will naturally follow.",
      description:
        "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So we don't fix career, money or relationships. We fix the BEING.",
      image: {
        src: "/assets/aistudio/Meditation_beneath_the_tree_of_life_9b10f3cb.png",
        alt: "A practitioner meditating beneath the radiant Tree of Life",
      },
    },

    understanding: {
      title: "Understanding Resistance",
      paragraphs: [
        "As children, we lived in pure presence, without barriers, beliefs or cultural conditioning. As we grew, labels like gender, nationality, status and career titles were layered on, creating fragile egos, stress and self-sabotage.",
        "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time, and we bring you back to your original state: Love, Peace, Joy, Contentment, Truth, Purity and Honesty.",
      ],
      image: {
        src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
        alt: "Balanced stones resting in soft sunlight with leaves",
      },
    },

    signs: {
      title: "Resistance may feel like",
      items: [
        "Acting from pressure instead of peace at work",
        "Asking for love instead of giving it in relationships",
        "Operating from fear and ownership around money",
        "Defining yourself through labels such as status, nationality and career titles",
        "A low internal battery that external achievements cannot recharge",
        "Fragile ego, stress and self-sabotage",
      ],
    },

    modalities: {
      title: "How the Path Can Support You",
      subtitle:
        "Human touch meets modern technology: inner awareness and frequency-based healing working together.",
      cards: [
        {
          id: "coaching",
          title: "Coaching",
          icon: "Compass",
          color: "#EAE6F7",
          accentColor: "#6B46C1",
          description:
            "Uses NLP, EFT, Ho'oponopono and subconscious reprogramming to release deep-seated mental and emotional blockages, so you act from peace instead of pressure.",
          bulletPoints: [
            "NLP & EFT",
            "Ho'oponopono",
            "Subconscious reprogramming",
          ],
          image: {
            src: "/assets/aistudio/image2_aedbb8dd.jpeg",
            alt: "A private mindful coaching session",
          },
        },
        {
          id: "frequency-healing",
          title: "Frequency Healing",
          icon: "Volume2",
          color: "#E2F4EE",
          accentColor: "#0D9488",
          description:
            "Bioenergetic frequency protocols that release stored stress, support the nervous system and restore a state of inner calm and balance.",
          bulletPoints: [
            "Chakra Balancing Frequency",
            "Vagus Frequency",
            "Detoxify Frequency",
          ],
          image: {
            src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
            alt: "A singing bowl used during a sound wellness session",
          },
        },
        {
          id: "synergy",
          title: "Synergy",
          icon: "Sparkles",
          color: "#FEF7E6",
          accentColor: "#D97706",
          description:
            "Deep inner awareness blended with modern frequency technology, so your journey from illness to wellness is recorded and understood.",
          bulletPoints: [
            "Pre- and post-session biofield measurement",
            "HRV & parasympathetic coherence tracking",
            "Personalised integration guidance",
          ],
          image: {
            src: "/assets/aistudio/Balancing_stones_and_botanical_leaves_cdede477.png",
            alt: "A peaceful stone and botanical harmony",
          },
        },
      ],
    },

    process: {
      title: "The Experience",
      steps: [
        {
          number: "01",
          title: "Measure",
          description:
            "Pre-session biofield measurement and resonance mapping establish your starting point.",
        },
        {
          number: "02",
          title: "Reprogram",
          description:
            "Subconscious reprogramming with NLP, EFT and Ho'oponopono releases deep-seated blockages.",
        },
        {
          number: "03",
          title: "Harmonize",
          description:
            "Your chosen frequency protocol aligns your energy state and supports parasympathetic coherence.",
        },
        {
          number: "04",
          title: "Integrate",
          description:
            "Post-session measurement and personalised integration guidance help carry results into daily life.",
        },
      ],
    },

    suitableFor: {
      title: "This pathway may suit you if you want to",
      items: [
        "Fix the Being first, so that the Doing naturally follows",
        "Act from peace rather than pressure at work",
        "Give love in relationships rather than ask for it",
        "Feel like a trustee of money rather than operate from fear and ownership",
        "Decide who you want to BE this year",
      ],
    },

    ctaBanner: {
      title: "Make Space for Genuine Freedom",
      subtitle:
        "Take the first step toward aligning your energy field, clearing deep stressors, and restoring your original default state.",
      primaryCta: {
        label: "Schedule Your Free Discovery Call",
        href: "/contact?interest=freedom-from-resistance",
      },
      secondaryCta: {
        label: "View All Offerings",
        href: "/offerings",
      },
      backgroundImage: {
        src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
        alt: "A peaceful mountain horizon in soft morning light",
      },
    },

    disclaimer: {
      title: "Please note",
      text: "This offering is a complementary wellness experience and is not psychotherapy, medical treatment or crisis support.",
    },
  },

  thoughtsPage: {
    id: "thoughts",
    path: "/thoughts",
    meta: {
      title: "Reflections for Your Journey | Inner Being Wellness",
      description:
        "Inner inquiries on peace and pressure, love, money and identity from Muazzam Abdul Rehman and Inner Being Wellness.",
    },

    hero: {
      badge: "JOURNAL & INNER INQUIRY",
      title: "Reflections for Your Journey",
      description:
        "True realization arises from asking the right inner questions. Reflect deeply on who you are being.",
      image: {
        src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
        alt: "A person writing in a journal in warm natural light",
      },
    },

    featuredArticle: {
      id: "at-work-peace-or-pressure",
      tag: "CAREER & ALIGNMENT",
      title: "At Work, Do You Act from Peace or Pressure?",
      subtitle: "If I am peace, my career decisions will be peaceful.",
      excerpt:
        "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances. This reflection returns to the root: the state you act from.",
      readTime: "5 min read",
      date: "October 2026",
      image: {
        src: "/assets/aistudio/program_inner_growth_1791868807800_dabf991f.jpg",
        alt: "Journal with eucalyptus and tea on wooden table",
      },
      content: [
        "If I am peace, my career decisions will be peaceful. When we act from pressure, even a successful decision carries the weight of the state it was made in.",
        "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances: the role, the title, the next target. True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
        "So today we don't fix the career. We fix the BEING, and the Doing will naturally follow.",
        "Ask yourself honestly: at work, do I act from peace or pressure?",
      ],
    },

    categories: [
      { id: "all", label: "All Thoughts" },
      { id: "career", label: "Career & Alignment" },
      { id: "relationships", label: "Relationships" },
      { id: "abundance", label: "Abundance & Wealth" },
      { id: "identity", label: "Identity & Future" },
    ],

    articles: [
      {
        id: "article-1",
        slug: "at-work-peace-or-pressure",
        category: "career",
        tag: "CAREER & ALIGNMENT",
        title: "At Work, Do You Act from Peace or Pressure?",
        excerpt:
          "If I am peace, my career decisions will be peaceful. A reflection on the state behind your decisions.",
        readTime: "5 min read",
        date: "Oct 2026",
        image: {
          src: "/assets/aistudio/A_more_conscious_you_journal_a4e34c3f.png",
          alt: "A peaceful mindful journal pause in a modern workspace",
        },
        content: [
          "If I am peace, my career decisions will be peaceful. When we act from pressure, even a successful decision carries the weight of the state it was made in.",
          "In our modern lives, we spend an enormous amount of energy trying to fix external circumstances: the role, the title, the next target. True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
          "So today we don't fix the career. We fix the BEING, and the Doing will naturally follow.",
          "Ask yourself honestly: at work, do I act from peace or pressure?",
        ],
      },
      {
        id: "article-2",
        slug: "give-love-or-ask-for-love",
        category: "relationships",
        tag: "RELATIONSHIPS & SOURCE",
        title: "In Relationships, Do You Give Love or Ask for Love?",
        excerpt:
          "If I am love, my relationships will be loving. An inquiry into where love begins.",
        readTime: "7 min read",
        date: "Oct 2026",
        image: {
          src: "/assets/aistudio/program_guided_healing_1791868808281_9a3a81f0.jpg",
          alt: "A restorative sound bath arrangement",
        },
        content: [
          "If I am love, my relationships will be loving. Love is one of our original default settings: unconditional source resonance.",
          "As we grew, labels of status, nationality and expectation were layered onto who we are. This division created fragile egos, stress and self-sabotage, and many of us began to ask for love rather than give it.",
          "Ask yourself honestly: in my relationships, do I give love or ask for love?",
        ],
      },
      {
        id: "article-3",
        slug: "trustee-not-owner",
        category: "abundance",
        tag: "ABUNDANCE & WEALTH",
        title:
          "With Money, Are You a Trustee or Operating from Fear and Ownership?",
        excerpt:
          "Releasing scarcity mindsets and stepping into the role of a secure trustee of wealth.",
        readTime: "6 min read",
        date: "Sep 2026",
        image: {
          src: "/assets/aistudio/Balanced_stones_in_sunlight_1ed4bb6b.png",
          alt: "Balanced stones in sunlight with leaves",
        },
        content: [
          "Money often brings out scarcity mindsets and fear. When we operate from fear and ownership, wealth becomes something to defend rather than something to steward.",
          "The Prosperity Frequency aligns your internal energetic frequency with abundance, releasing fear around money and positioning you as a secure trustee of wealth.",
          "Ask yourself honestly: with money, do I feel like a trustee, or do I operate from fear and ownership?",
        ],
      },
      {
        id: "article-4",
        slug: "who-do-you-want-to-be",
        category: "identity",
        tag: "IDENTITY & FUTURE",
        title: "Who Do You Want to BE This Year?",
        excerpt: "Fix the Being first, and the Doing will naturally follow.",
        readTime: "6 min read",
        date: "Sep 2026",
        image: {
          src: "/assets/aistudio/mountain_meditation_1791868808291_52af2f67.jpg",
          alt: "A person reflecting quietly in nature on mountain summit",
        },
        content: [
          "Most of us plan the year around what we want to do: targets, titles and milestones. Inner Being Wellness invites a different question: who do you want to BE?",
          "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. Fix the Being first, and the Doing will naturally follow.",
          "Ask yourself honestly: who do I want to BE this year?",
        ],
      },
      {
        id: "article-5",
        slug: "from-innocence-to-identity-crisis",
        category: "identity",
        tag: "IDENTITY & FUTURE",
        title: "From Innocence to Identity Crisis",
        excerpt: "How the layering of labels moves us away from pure presence.",
        readTime: "5 min read",
        date: "Aug 2026",
        image: {
          src: "/assets/aistudio/Meditation_at_sunrise_80d22919.png",
          alt: "A person at sunrise in quiet reflection",
        },
        content: [
          "As children, we lived in pure presence: laughing, playing, crying and sleeping without barriers, beliefs or cultural conditioning. We simply were.",
          "As we grew, external labels were added: gender, nationality, status, career titles and societal expectations. This division created fragile egos, stress and self-sabotage.",
          "True transformation doesn't happen at the surface level; it begins at the root of who you are in essence.",
        ],
      },
      {
        id: "article-6",
        slug: "returning-to-your-original-default-settings",
        category: "identity",
        tag: "IDENTITY & FUTURE",
        title: "Returning to Your Original Default Settings",
        excerpt:
          "Love, Peace, Joy, Contentment, Truth, Purity and Honesty: the state we return to.",
        readTime: "5 min read",
        date: "Aug 2026",
        image: {
          src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
          alt: "A gentle and mindful practice in peaceful sunroom",
        },
        content: [
          "When your internal battery is low, external achievements cannot truly power you up. Most modern dis-eases stem from stresses stored over time.",
          "Our original default settings are Love (unconditional source resonance), Peace (unshakable inner calm), Joy (spontaneous lightness of being), Contentment (deep fulfillment in the now), Truth (authentic self-expression), Purity (a clear energetic container) and Honesty (radical internal integrity).",
          "The work is to bring you back to your original state.",
        ],
      },
    ],

    newsletter: {
      title: "Receive a quiet note for your inner journey.",
      description:
        "Occasional reflections on awareness, wellbeing and intentional living. No spam, no marketing noise.",
      emailLabel: "Email address",
      emailPlaceholder: "you@example.com",
      consentText:
        "By subscribing, you agree to receive reflections from Inner Being Wellness. You may unsubscribe at any time.",
      submitLabel: "Subscribe",
      successMessage: "Thank you. Your subscription request has been received.",
      errorMessage: "Please enter a valid email address.",
    },
  },

  contactPage: {
    id: "contact",
    path: "/contact",
    meta: {
      title: "Schedule Your Free Discovery Call | Inner Being Wellness",
      description:
        "Book a free discovery call or send an enquiry to Inner Being Wellness in Abu Dhabi & Dubai.",
    },

    hero: {
      badge: "BEGIN YOUR TRANSFORMATION",
      title: "Schedule Your Free Discovery Call",
      description:
        "Take the first step toward aligning your energy field, clearing deep stressors, and restoring your original default state with Inner Being Wellness.",
      image: {
        src: "/assets/aistudio/yoga_sunroom_1791868806713_7e114c37.jpg",
        alt: "A calm private space prepared for a wellness consultation",
      },
      logo: {
        src: "/assets/aistudio/finallogo.png",
        alt: "Inner Being Wellness logo",
        width: 600,
        height: 600,
      },
    },

    contactOptions: [
      {
        id: "email",
        icon: "Mail",
        title: "Email",
        value: COMMON_EMAIL,
        href: `mailto:${COMMON_EMAIL}`,
        description: "For session enquiries and general questions.",
      },
      {
        id: "whatsapp",
        icon: "MessageCircle",
        title: "WhatsApp",
        value: "+971 58 5811609",
        href: "https://wa.me/971585811609",
        description: "Message us for a quick response.",
      },
      {
        id: "session-format",
        icon: "Flower2",
        title: "Location",
        value: "Abu Dhabi & Dubai, UAE",
        description:
          "Online and in-person sessions, confirmed according to availability.",
      },
      {
        id: "response",
        icon: "Clock",
        title: "Response Time",
        value: "Same day",
        description: "We review every enquiry with personalized care.",
      },
    ],

    form: {
      id: "contact-form",
      title: "Schedule Your Free Discovery Call",
      description:
        "Complete the form below, and Inner Being Wellness will respond using the contact details you provide.",
      fields: [
        {
          id: "fullName",
          name: "fullName",
          label: "Your Full Name",
          type: "text",
          placeholder: "e.g., Alex Rivers",
          required: true,
        },
        {
          id: "email",
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "e.g., alex@innerbeing.com",
          required: true,
        },
        {
          id: "phone",
          name: "phone",
          label: "Phone Number (Optional)",
          type: "tel",
          placeholder: "Include country code (e.g. +971 50 123 4567)",
          required: false,
        },
        {
          id: "interest",
          name: "interest",
          label: "Service of Interest",
          type: "select",
          required: true,
          options: [
            { label: "Chakra Balancing Frequency", value: "chakra-balancing" },
            { label: "Holistic Health Frequency", value: "holistic-health" },
            { label: "Prosperity Frequency", value: "prosperity" },
            { label: "Cell Harmony Frequency", value: "cell-harmony" },
            { label: "Prostate Harmony Frequency", value: "prostate-harmony" },
            { label: "Vagus Frequency", value: "vagus" },
            { label: "Mental Clarity Frequency", value: "mental-clarity" },
            { label: "Detoxify Frequency", value: "detoxify" },
            {
              label: "Negative Entities Clearance Frequency",
              value: "negative-entities-clearance",
            },
            {
              label: "Freedom from Resistance (Signature)",
              value: "freedom-from-resistance",
            },
            {
              label: "Founder & Leadership Coaching (Janki Ravani)",
              value: "founder-coaching",
            },
            { label: "General Wellness Enquiry", value: "general-enquiry" },
          ],
        },
        {
          id: "preferredDate",
          name: "preferredDate",
          label: "Preferred Date",
          type: "date",
          required: true,
        },
        {
          id: "sessionPreference",
          name: "sessionPreference",
          label: "Preferred Session Format",
          type: "radio",
          required: true,
          options: [
            { label: "Online", value: "online" },
            { label: "In Person", value: "in-person" },
            { label: "Open to either", value: "either" },
          ],
        },
        {
          id: "message",
          name: "message",
          label: "What is your current intention or challenge?",
          type: "textarea",
          placeholder: "Share a few words about your state of Being...",
          required: true,
        },
      ],
      submitButton: {
        label: "Confirm Free Discovery Call",
        loadingLabel: "Sending…",
      },
      messages: {
        success:
          "Thank you. Your free discovery call request has been received. We will contact you with your pre-session bio-resonance guide within two working days.",
        error:
          "Please verify that all required fields are filled out correctly.",
      },
      privacyNote:
        "Please do not include medical records, payment details or confidential credentials in this form.",
    },

    expectations: {
      title: "What happens after you enquire?",
      steps: [
        {
          number: "01",
          title: "We read your message",
          description:
            "Your intention, challenge and chosen protocol help us understand your unique enquiry.",
        },
        {
          number: "02",
          title: "We respond personally",
          description:
            "We contact you with your pre-session bio-resonance guide and available next steps.",
        },
        {
          number: "03",
          title: "You decide",
          description:
            "There is no obligation to continue until the protocol and approach feel entirely right for you.",
        },
      ],
    },

    safetyNotice: {
      title: "Need urgent support?",
      text: "Inner Being Wellness does not provide emergency or psychiatric crisis services. If you or someone else may be in immediate danger, contact your local emergency health service or crisis support provider immediately.",
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          id: "experience",
          question: 'What does "Fix the Being first" mean?',
          answer:
            "If I am peace, my career decisions will be peaceful. If I am love, my relationships will be loving. So we don't fix career, money or relationships. We fix the BEING, and the Doing will naturally follow.",
        },
        {
          id: "online",
          question: "What are the original default settings?",
          answer:
            "Love, Peace, Joy, Contentment, Truth, Purity and Honesty. When your internal battery is low, external achievements cannot truly power you up, so we bring you back to your original state.",
        },
        {
          id: "choose-offering",
          question: "What if I do not know which protocol to choose?",
          answer:
            "Select 'General Wellness Enquiry' on the form and share your current intention or challenge. We will recommend the most suitable starting point.",
        },
        {
          id: "medical-care",
          question: "Is this a replacement for medical or psychological care?",
          answer:
            "No. Inner Being Wellness provides complementary holistic education, coaching, and frequency-based modalities. It does not replace medical diagnosis, psychotherapy, or psychiatry.",
        },
        {
          id: "confidentiality",
          question: "Will my enquiry be treated privately?",
          answer:
            "Yes, your enquiry is strictly confidential and used solely for direct communication between you and Inner Being Wellness.",
        },
      ],
    },
  },

  footer: {
    brandName: "INNER BEING WELLNESS",
    tagline: "Fix the Being first, and the Doing will naturally follow.",
    description:
      "Frequency-based energy healing, subconscious reprogramming and conscious awareness with Muazzam Abdul Rehman and Janki Ravani.",
    columns: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "About Janki Ravani", href: "/janki" },
          { label: "Offerings", href: "/offerings" },
          {
            label: "Freedom from Resistance",
            href: "/freedom-from-resistance",
          },
          { label: "Original Default Settings", href: "/#four-defaults" },
          { label: "Thoughts", href: "/thoughts" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Offerings",
        links: [
          { label: "Chakra Balancing", href: "/offerings#chakra-balancing" },
          { label: "Holistic Health", href: "/offerings#holistic-health" },
          { label: "Prosperity", href: "/offerings#prosperity" },
          { label: "Cell Harmony", href: "/offerings#cell-harmony" },
          { label: "Prostate Harmony", href: "/offerings#prostate-harmony" },
          { label: "Vagus", href: "/offerings#vagus" },
          { label: "Mental Clarity", href: "/offerings#mental-clarity" },
          { label: "Detoxify", href: "/offerings#detoxify" },
          {
            label: "Negative Entities Clearance",
            href: "/offerings#negative-entities-clearance",
          },
          {
            label: "Freedom from Resistance",
            href: "/freedom-from-resistance",
          },
        ],
      },
      {
        title: "Contact",
        details: [
          {
            label: "Email",
            value: COMMON_EMAIL,
            href: `mailto:${COMMON_EMAIL}`,
          },
          {
            label: "Location",
            value: "Abu Dhabi & Dubai, UAE",
          },
          {
            label: "Session Format",
            value: "Online & In-person by appointment",
          },
          {
            label: "Response",
            value: "same day",
          },
        ],
      },
    ],
    copyright:
      "© 2026 Inner Being Wellness (Muazzam Abdul Rehman). All rights reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Settings", href: "#cookies" },
    ],
    wellnessDisclaimer:
      "Inner Being Wellness offers complementary wellbeing and educational practices. It does not provide medical diagnosis, psychotherapy or emergency services.",
  },
};

export const getWhatsAppLink = (message) => {
  const { whatsapp, whatsappMessage } = siteData.brand.contact;
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message || whatsappMessage)}`;
};
export default siteData;