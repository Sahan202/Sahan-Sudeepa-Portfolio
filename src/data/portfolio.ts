export const profile = {
  name: 'Sahan Sudeepa Gunawardhana',
  portrait: '/images/sahan-portrait.jpeg',
  github: 'https://github.com/Sahan202',
  linkedin: 'https://www.linkedin.com/in/sahan-gunawardhana-fullstack/',
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://sahan-sudeepa-portfolio.netlify.app',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'sahansudeepa589@gmail.com',
  phone: '0766428635',
  phoneHref: 'tel:+94766428635',
  whatsappHref: 'https://wa.me/94766428635',
};

export const navigation = [
  'Home',
  'About',
  'Projects',
  'Skills',
  'Experience',
  'Education',
  'Contact',
];

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'AI & Data' | 'Full-Stack' | 'Interactive';
  label: string;
  description: string;
  stack: string[];
  features: string[];
  problem: string;
  solution: string;
  architecture: string[];
  considerations: string[];
  learning: string;
  accent: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: 'interview-ai',
    title: 'InterviewAI',
    shortTitle: 'Practice smarter.\nInterview better.',
    category: 'AI & Data',
    label: 'AI-POWERED INTERVIEW PRACTICE',
    accent: 'violet',
    video: '/videos/interview-ai.webm',
    description:
      'A full-stack AI-powered interview simulator for technical, HR, behavioral and system-design practice with personalized questions, voice answers and actionable feedback.',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Google Gemini',
      'Web Speech API',
      'Multer',
      'pdf-parse',
      'Vercel',
    ],
    features: [
      'Personalized interviews by role, experience level and category',
      'Technical, HR, behavioral and system-design modes',
      'Gemini-powered question generation and answer evaluation',
      'Resume PDF and job-description analysis',
      'Typed or Web Speech API voice answers',
      'Technical, communication and completeness scoring',
      'Printable final interview reports',
      'Responsive UI with dark mode',
    ],
    problem:
      'Interview preparation often spreads questions, role context and feedback across disconnected tools, making it difficult to practice a realistic session and understand how to improve.',
    solution:
      'InterviewAI brings personalized setup, resume and job-description context, an interactive interview flow and structured Gemini feedback into one practice experience.',
    architecture: [
      'React + TypeScript frontend',
      'Express + Gemini backend',
      'PDF and voice processing',
      'Vercel serverless deployment',
    ],
    considerations: [
      'Keeping the Gemini API key on the server and away from frontend variables.',
      'Converting spoken responses through the browser Web Speech API.',
      'Processing text-based PDF resumes for the current request.',
      'Presenting technical, communication and completeness feedback clearly.',
    ],
    learning:
      'Full-stack AI integration, document processing, browser voice interaction and turning model output into a practical performance report.',
    github: 'https://github.com/Sahan202/InterviewAI',
  },
  {
    slug: 'krish-fx-swing-lab',
    title: 'Krish FX Swing Lab Mobile App',
    shortTitle: 'Learn the market.\nMove with intention.',
    category: 'Interactive',
    label: 'REACT NATIVE × EXPO MOBILE APP',
    accent: 'blue',
    description:
      'A React Native and Expo learning app for trading students, with secure login, courses, lesson progress, video learning, live Zoom classes and student profile management.',
    stack: [
      'React Native',
      'Expo',
      'TypeScript',
      'Android',
      'iOS',
      'Video learning',
      'Zoom classes',
    ],
    features: [
      'Secure login',
      'Trading courses and lesson progress',
      'Video learning',
      'Live Zoom classes',
      'Student profile management',
      'One codebase for Android and iOS',
    ],
    problem:
      'Trading students need a focused place to move from course content to lesson progress and live learning sessions across their devices.',
    solution:
      'A mobile-first learning experience brings courses, progress, video lessons, live Zoom classes and profile management into one Expo application.',
    architecture: [
      'Expo + React Native app',
      'TypeScript screens',
      'Course and video learning',
      'Android + iOS delivery',
    ],
    considerations: [
      'Keeping the same learning flow usable across Android and iOS.',
      'Making course and lesson progress easy to understand.',
      'Presenting video and live-class entry points clearly on mobile.',
    ],
    learning:
      'Cross-platform mobile development with Expo and React Native, focused on learning workflows and device-friendly interaction.',
    github: 'https://github.com/Sahan202/krish-fx-swing-lab-mobile-app',
  },
  {
    slug: 'krish-fx-swing-lab-platform',
    title: 'Krish FX Swing Lab Platform',
    shortTitle: 'Learn with a system.\nTrade with confidence.',
    category: 'Full-Stack',
    label: 'SECURE FOREX LEARNING PLATFORM',
    accent: 'blue',
    description:
      'A secure online Forex learning platform with structured trading lessons, video courses, webinars, student applications, approval management and protected LMS access.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Supabase',
      'Tailwind CSS',
      'VdoCipher',
      'Zoom',
      'Nodemailer',
    ],
    features: [
      'Google and email authentication',
      'Protected student LMS access',
      'Structured courses and lesson progress',
      'VdoCipher-protected video lessons',
      'Webinars and live Zoom classes',
      'Student applications and approval management',
      'Admin and super-admin portals',
      'Audit logging and automated email workflows',
    ],
    problem:
      'Trading education needs a clear bridge between applications, protected lessons, live sessions and progress tracking without exposing the learning workflow to the public web.',
    solution:
      'Krish FX Swing Lab combines secure account access, structured courses, protected video learning, live-class entry points and role-based management into one focused platform.',
    architecture: [
      'Next.js App Router experience',
      'Supabase Auth + Postgres data',
      'Protected video lesson delivery',
      'Zoom live sessions + email workflows',
      'Admin + super-admin management',
    ],
    considerations: [
      'Keeping student, instructor and admin workflows separate and understandable.',
      'Protecting lesson access and checking permissions before serving course content.',
      'Recording progress, audit events and single-session behavior consistently.',
      'Making live-class and email workflows useful without interrupting the learning path.',
    ],
    learning:
      'Full-stack LMS architecture, Supabase security, protected media workflows and building role-aware learning products with Next.js.',
    image: '/images/krish-fx-login.png',
    imageAlt:
      'Krish FX Swing Lab login screen with a trading chart panel and secure learning access form.',
    github: 'https://github.com/Sahan202/krish-fx-swing-lab',
    demo: 'https://www.krishfxswinglab.com',
  },
  {
    slug: 'krish-fx-swing-lab-landing-page',
    title: 'Krish FX Swing Lab Landing Page',
    shortTitle: 'Trade with clarity.\nGrow with confidence.',
    category: 'Interactive',
    label: 'TRADING EDUCATION LANDING PAGE',
    accent: 'blue',
    description:
      'A premium, responsive landing page for Krish FX Swing Lab with modern UI, smooth motion, interactive entry points, mobile-first layouts, SEO-ready architecture and Vercel deployment.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Responsive UI',
      'Vercel',
    ],
    features: [
      'Animated hero and brand storytelling',
      'Responsive navigation and conversion-focused CTAs',
      'Login and registration entry points',
      'Google sign-in presentation',
      'Benefits, curriculum and community sections',
      'Mobile-first responsive layouts',
      'SEO-friendly page structure',
    ],
    problem:
      'A trading education product needs to communicate its method quickly while guiding new students from the first impression to a clear learning action.',
    solution:
      'The landing page uses strong visual hierarchy, trading-focused imagery, purposeful motion and direct login or registration paths to make the next step obvious.',
    architecture: [
      'Next.js landing shell',
      'Responsive content sections',
      'Auth entry points',
      'Animated brand presentation',
      'Vercel deployment',
    ],
    considerations: [
      'Keeping the hero image, typography and navigation readable across screen sizes.',
      'Using motion to support the message without slowing the first interaction.',
      'Making login and registration paths easy to find from the landing experience.',
    ],
    learning:
      'Conversion-focused landing design, responsive composition, polished motion and connecting brand storytelling to an authenticated product.',
    image: '/images/krish-fx-landing.png',
    imageAlt:
      'Krish FX Swing Lab landing page with blue trading chart hero, navigation and orange enrollment call to action.',
    github: 'https://github.com/Sahan202/krish-fx-swing-lab-landing-page',
    demo: 'https://krish-fx-swing-lab-landing.vercel.app',
  },
  {
    slug: 'campusmate',
    title: 'CampusMate',
    shortTitle: 'A calmer campus.\nOne connected app.',
    category: 'Interactive',
    label: 'FLUTTER × FIREBASE STUDENT APP',
    accent: 'green',
    description:
      'A responsive Flutter and Firebase student management app for timetable, modules, assignments, calendar, tasks, notes, GPA, study planning, notifications, profile and settings.',
    stack: [
      'Flutter',
      'Dart',
      'Firebase',
      'Cloud Firestore',
      'Firebase Storage',
      'Material 3',
      'Android / Web',
    ],
    features: [
      'Validated sign-in and register UI with demo fallback',
      'Light and dark Material 3 themes',
      'Calendar, modules and assignment views',
      'Tasks, notes, GPA and study planner entry points',
      'Firestore-backed student records',
      'Deadline reminders and file-picker uploads',
    ],
    problem:
      'Student routines are spread across timetables, assignments, notes and reminders, making it harder to see academic progress in one place.',
    solution:
      'CampusMate provides a responsive student workspace for planning, tracking academic work and connecting supported Firebase services when configured.',
    architecture: [
      'Flutter + Dart app shell',
      'Material 3 responsive UI',
      'Firebase Auth + Firestore',
      'Storage and reminders',
    ],
    considerations: [
      'Keeping the demo workspace safe before Firebase credentials are available.',
      'Applying Firestore rules before storing signed-in user data.',
      'Separating local reminders from future push notification delivery.',
      'Supporting Android and web flows from one Flutter project.',
    ],
    learning:
      'Flutter application architecture, Firebase-aware student workflows, responsive Material 3 design and safe demo-first development.',
    github:
      'https://github.com/Sahan202/CampusMate-Smart-Student-Management-App',
  },
  {
    slug: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    shortTitle: 'A better match.\nA clearer next step.',
    category: 'AI & Data',
    label: 'AI-POWERED CAREER TOOLS',
    accent: 'violet',
    video: '/videos/ai-resume-analyzer.webm',
    description:
      'A modern web application that compares PDF and DOCX resumes with job descriptions, then turns the analysis into match scores, skills insights and practical improvement suggestions.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'AI / NLP'],
    features: [
      'PDF and DOCX resume uploads',
      'Job-description input',
      'Resume-to-job matching',
      'Resume match score',
      'Relevant and missing skills analysis',
      'Actionable improvement suggestions',
      'Responsive, user-friendly interface',
    ],
    problem:
      'Job seekers often need to compare a resume, job description and skill gaps manually, without a clear signal about what to improve first.',
    solution:
      'AI Resume Analyzer brings resume upload, job context, matching, skill analysis and improvement guidance into one focused workflow.',
    architecture: [
      'React + TypeScript frontend',
      'Vite development and build tooling',
      'Document extraction workflow',
      'AI / NLP analysis',
      'Match results and recommendations',
    ],
    considerations: [
      'Supporting both PDF and DOCX resume inputs.',
      'Keeping match scores and missing-skill feedback easy to understand.',
      'Presenting AI-assisted recommendations as practical next steps.',
    ],
    learning:
      'Building AI-assisted career tooling, document-driven workflows and clear result interfaces with React and TypeScript.',
    github: 'https://github.com/Sahan202/ai-resume-analyzer',
  },
  {
    slug: 'magic-hand-studio',
    title: 'Magic Hand Studio',
    shortTitle: 'Move with intention.\nMake it visual.',
    category: 'Interactive',
    label: 'REAL-TIME COMPUTER VISION PLAYGROUND',
    accent: 'orange',
    video: '/videos/magic-hand-studio.webm',
    description:
      'A real-time webcam visual playground where MediaPipe hand tracking and Canvas turn two-hand pinch gestures into expressive four-point shapes, filters and live effects.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'MediaPipe Hand Landmarker',
      'Canvas API',
      'Webcam APIs',
    ],
    features: [
      'Real-time hand landmark tracking',
      'Two-hand pinch shape creation',
      'Interactive visual filters and effects',
      'Invisibility mode',
      'Screenshot and recording controls',
      'Voice commands',
      'Mobile-friendly guidance',
    ],
    problem:
      'Creative webcam experiments can feel disconnected from the user, especially when interaction is limited to buttons and mouse input.',
    solution:
      'Magic Hand Studio makes the hands the interface, combining live landmarks, pinch gestures and Canvas rendering into an immediate visual playground.',
    architecture: [
      'React + TypeScript interface',
      'MediaPipe Hand Landmarker tracking',
      'Canvas rendering and compositing',
      'Webcam capture and media controls',
      'Voice command interaction layer',
    ],
    considerations: [
      'Keeping visual feedback responsive while processing webcam landmarks.',
      'Making gesture guidance clear for first-time users.',
      'Handling camera permissions and mobile layouts gracefully.',
      'Keeping recording and screenshot actions easy to discover.',
    ],
    learning:
      'Real-time computer vision interaction, Canvas rendering and designing playful interfaces that respond to natural movement.',
    github: 'https://github.com/Sahan202/Magic-Hand-Studio',
  },
  {
    slug: 'lucky-travel',
    title: 'Lucky Travel',
    shortTitle: 'Less planning.\nMore discovering.',
    category: 'Full-Stack',
    label: 'TRAVEL × ARTIFICIAL INTELLIGENCE',
    accent: 'green',
    video: '/videos/lucky-travel.webm',
    description:
      'An AI-powered Sri Lankan travel platform that builds personalized itineraries around dates, budget, travelers, interests and destinations.',
    stack: [
      'React',
      'JavaScript',
      'Node.js',
      'AI',
      'Leaflet',
      'OpenStreetMap',
      'Cloudinary',
      'GSAP',
    ],
    features: [
      'AI itinerary generation',
      'Hotels and travel packages',
      'Booking requests',
      'Sinhala, English and Tamil chatbot',
      'Maps, reviews and gallery',
    ],
    problem:
      'Planning a trip involves balancing many preferences while moving between maps, accommodation information and travel advice.',
    solution:
      'Unify trip preferences, AI-generated itineraries and local travel information in a Sri Lanka-focused planning experience.',
    architecture: [
      'Travel preferences',
      'Node.js + AI',
      'Personalized itinerary',
      'Maps + booking requests',
    ],
    considerations: [
      'Turning multiple traveler preferences into a coherent itinerary.',
      'Designing multilingual assistance.',
      'Coordinating map, media and booking experiences.',
    ],
    learning:
      'AI product workflows, location-based interfaces and connecting multiple services in a full-stack application.',
  },
  {
    slug: 'bird-smash',
    title: 'Bird Smash Game',
    shortTitle: 'Your hands.\nThe controller.',
    category: 'Interactive',
    label: 'COMPUTER VISION EXPERIMENT',
    accent: 'orange',
    description:
      'A browser-based webcam hand-tracking game where players use hand movements to interact with objects on screen.',
    stack: ['React', 'TypeScript', 'Vite', 'Computer Vision', 'Webcam'],
    features: [
      'Webcam hand tracking',
      'Movement-based interaction',
      'Browser-based gameplay',
    ],
    problem:
      'Traditional input devices create a gap between physical movement and interaction with a game.',
    solution:
      'Use webcam-based hand tracking to turn movement into direct interaction with objects in the browser.',
    architecture: [
      'Webcam input',
      'Hand tracking',
      'Interaction mapping',
      'Game interface',
    ],
    considerations: [
      'Keeping movement and visual feedback responsive.',
      'Accounting for different lighting and camera conditions.',
      'Communicating webcam permissions clearly.',
    ],
    learning:
      'Computer vision in the browser, real-time interaction and designing feedback for an unconventional input method.',
  },
  {
    slug: 'wattdeal',
    title: 'WattDeal',
    shortTitle: 'A marketplace.\nBuilt for the bid.',
    category: 'Full-Stack',
    label: 'RETAIL & WHOLESALE PLATFORM',
    accent: 'blue',
    description:
      'A retail and wholesale bidding platform that connects buyers and sellers through product bidding.',
    stack: ['React', 'JavaScript', 'CSS', 'Node.js', 'MongoDB'],
    features: [
      'Authentication',
      'Product management',
      'Buyer bidding',
      'Seller bidding',
      'Highest bid notifications',
    ],
    problem:
      'Buyers and sellers need a clear way to manage products, participate in bidding and keep track of the highest offers.',
    solution:
      'Bring authentication, product management and buyer/seller bidding into a shared marketplace workflow.',
    architecture: [
      'Buyer / seller interface',
      'Node.js APIs',
      'MongoDB',
      'Bid notifications',
    ],
    considerations: [
      'Keeping buyer and seller workflows clear.',
      'Maintaining consistent bidding data.',
      'Making important bid changes visible.',
    ],
    learning:
      'Database-driven application design, authenticated workflows and multi-role product interfaces.',
  },
  {
    slug: 'cinema-crowd-prediction',
    title: 'Cinema Crowd Prediction & Capacity Optimization',
    shortTitle: 'Predict the crowd.\nUnderstand the why.',
    category: 'AI & Data',
    label: 'FINAL-YEAR RESEARCH',
    accent: 'rose',
    description:
      'Final-year research into dynamic machine-learning-based real-time cinema crowd prediction and capacity optimization using explainable AI.',
    stack: [
      'Python',
      'Machine Learning',
      'FastAPI',
      'Next.js',
      'Explainable AI',
    ],
    features: [
      'Cinema occupancy prediction',
      'Weather, holiday and movie-popularity inputs',
      'Capacity and revenue optimization',
      'SHAP explainability',
      'Analytics dashboard',
    ],
    problem:
      'Cinema demand varies with weather, holidays and movie popularity, making capacity planning a complex decision.',
    solution:
      'Research predictive models alongside SHAP explanations to support understandable, data-informed capacity decisions.',
    architecture: [
      'Contextual demand inputs',
      'Prediction model',
      'SHAP explanations',
      'Optimization dashboard',
    ],
    considerations: [
      'Combining contextual signals with cinema demand data.',
      'Evaluating prediction quality responsibly.',
      'Explaining model outputs to support operational decisions.',
    ],
    learning:
      'Machine learning research, model explainability and translating predictions into decision-support interfaces.',
  },
  {
    slug: 'botcalm',
    title: 'Botcalm Compliance Platform',
    shortTitle: 'Details matter.\nQuality compounds.',
    category: 'Full-Stack',
    label: 'PROFESSIONAL PROJECT WORK',
    accent: 'slate',
    description:
      'Software engineering and full-stack development experience on a compliance platform, focused on frontend quality, issue resolution and collaboration.',
    stack: ['Next.js', 'TypeScript', 'React', 'APIs', 'Git', 'SonarQube'],
    features: [
      'Frontend development',
      'Bug fixing and UI improvements',
      'QA issue resolution',
      'Git workflows',
      'Collaborative, production-quality development',
    ],
    problem:
      'Professional software needs consistent interfaces, reliable behavior and a clear process for resolving quality issues.',
    solution:
      'Contribute frontend development, UI improvements and bug fixes through collaborative Git and QA workflows.',
    architecture: [
      'React + Next.js UI',
      'API integration',
      'Git collaboration',
      'QA + SonarQube',
    ],
    considerations: [
      'Tracing UI issues through existing application behavior.',
      'Making focused fixes within a shared codebase.',
      'Keeping implementation aligned with QA feedback.',
    ],
    learning:
      'Professional development workflows, collaboration and the attention to detail required to maintain software quality.',
  },
];

export const skillGroups = {
  Frontend: [
    ['React', 'Component-driven interfaces', 'Re'],
    ['Next.js', 'Full-stack React applications', 'N'],
    ['React Native', 'Cross-platform mobile interfaces', 'RN'],
    ['Flutter', 'Responsive Dart applications', 'Fl'],
    ['TypeScript', 'Types that clarify intent', 'TS'],
    ['JavaScript', 'The language of the web', 'JS'],
    ['HTML', 'Semantic, accessible structure', 'H5'],
    ['CSS', 'Responsive visual systems', 'C3'],
    ['Tailwind CSS', 'Composable interface styling', 'Tw'],
  ],
  Backend: [
    ['Node.js', 'JavaScript on the server', 'N'],
    ['Express.js', 'Focused server-side APIs', 'Ex'],
    ['FastAPI', 'Python-powered API services', 'Fa'],
    ['REST APIs', 'Connecting applications and data', '{}'],
  ],
  Database: [
    ['MongoDB', 'Document-based data modeling', 'M'],
    ['PostgreSQL', 'Relational data foundations', 'Pg'],
    ['Supabase', 'Postgres-backed application services', 'S'],
  ],
  Programming: [
    ['Java', 'Object-oriented programming', 'Ja'],
    ['Python', 'Data, automation and AI', 'Py'],
    ['Dart', 'Flutter application development', 'Da'],
    ['TypeScript', 'Maintainable application logic', 'TS'],
    ['JavaScript', 'Interactive web experiences', 'JS'],
  ],
  Tools: [
    ['Git', 'Version control and collaboration', 'Gt'],
    ['GitHub', 'Code, projects and workflows', 'Gh'],
    ['Expo', 'React Native development workflow', 'Ex'],
    ['Firebase', 'Auth, data and storage services', 'Fb'],
    ['VS Code', 'A focused development workspace', 'Vs'],
    ['Postman', 'API development and testing', 'Po'],
  ],
};
