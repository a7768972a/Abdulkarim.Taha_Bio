'use client';

import { useEffect, useState, useRef, createContext, useContext } from 'react';
import Image from 'next/image';
import SnowBackground from '@/components/SnowBackground';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Language Context ─────────────────────────────────────────
type Lang = 'ar' | 'en';

interface Translations {
  [key: string]: { ar: string; en: string };
}

const t: Translations = {
  loading: { ar: '...جاري التحميل', en: 'loading...' },
  nameTitle: { ar: 'مطور ناشئ', en: 'Junior Developer' },
  founderLine: { ar: 'مؤسس ATMETLY — مؤسسة الاتمتة بالذكاء الصناعي', en: 'Founder of ATMETLY — AI Automation Agency' },
  available: { ar: 'متاح للتعاون', en: 'Available for collaboration' },
  aboutTitle: { ar: 'نبذة عني', en: 'About Me' },
  aboutDesc: {
    ar: 'أنا عبدالكريم طه، مطور ناشئ وشغوف بالتكنولوجيا. أسعى دائماً لتعلم مهارات جديدة وبناء مشاريع مبتكرة.',
    en: "I'm Abdulkarim Taha, a passionate junior developer. I'm always eager to learn new skills and build innovative projects."
  },
  skillsTitle: { ar: 'مهاراتي', en: 'My Skills' },
  skillsSubtitle: { ar: 'برمجة وتصميم المواقع الالكترونية', en: 'Website Programming & Design' },
  skill1Title: { ar: 'تصميم وتطوير وبناء المواقع الالكترونية والمتاجر الالكترونية', en: 'Web Design, Development & E-commerce' },
  skill1Desc: { ar: 'تصميم وتطوير وبناء المواقع الالكترونية والمتاجر الالكترونية بجودة عالية وتصميم احترافي.', en: 'Designing, developing and building websites and e-commerce stores with high quality and professional design.' },
  skill2Title: { ar: 'بناء الانظمة الذكية المعقدة للشركات والمؤسسات', en: 'Complex Smart Systems for Companies' },
  skill2Desc: { ar: 'بناء انظمة ذكية ومعقدة مخصصة للشركات والمؤسسات لتعزيز كفاءة العمل والانتاجية.', en: 'Building complex smart systems tailored for companies and institutions to boost efficiency and productivity.' },
  skill3Title: { ar: 'الاتمتة الذكية باستخدام الذكاء الصناعي', en: 'Smart AI Automation — ATMETLY AI' },
  skill3Desc: { ar: 'الاتمتة الذكية باستخدام الذكاء الصناعي — هذا هو العمل الاساسي لمؤسسة ATMETLY AI.', en: 'Smart automation using AI — this is the core work of ATMETLY AI.' },
  skill4Title: { ar: 'تصميم وترويج الاعلانات الالكترونية بالذكاء الصناعي', en: 'AI-Powered Ad Design & Promotion' },
  skill4Desc: { ar: 'تصميم وترويج الاعلانات الالكترونية بانواعها باستخدام احدث تقنيات الذكاء الصناعي.', en: 'Designing and promoting electronic ads of all types using the latest AI technologies.' },
  connectTitle: { ar: 'تواصل معي', en: 'Connect With Me' },
  linksTitle: { ar: '🔗 روابطي', en: '🔗 My Links' },
  footer: { ar: '© 2025 عبدالكريم طه. جميع الحقوق محفوظة.', en: '© 2025 Abdulkarim Taha. All rights reserved.' },
};

const LangContext = createContext<{ lang: Lang; toggle: () => void }>({ lang: 'ar', toggle: () => {} });
const useLang = () => useContext(LangContext);

function T({ k }: { k: string }) {
  const { lang } = useLang();
  return <>{t[k]?.[lang] || k}</>;
}

// ─── Social/Connect Links ───────────────────────────────────────
interface SocialLink {
  name: string;
  nameAr: string;
  icon: string;
  url: string;
  color: string;
  username: string;
  usernameAr: string;
  isPhone?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    nameAr: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/abdul85524/',
    color: '#E1306C',
    username: '@abdul85524',
    usernameAr: '@abdul85524',
  },
  {
    name: 'YouTube',
    nameAr: 'YouTube',
    icon: 'youtube',
    url: 'https://www.youtube.com/@abdulkarim_8552',
    color: '#FF0000',
    username: '@abdulkarim_8552',
    usernameAr: '@abdulkarim_8552',
  },
  {
    name: 'GitHub',
    nameAr: 'GitHub',
    icon: 'github',
    url: 'https://github.com/a7768972a',
    color: '#f0f0f0',
    username: 'a7768972a',
    usernameAr: 'a7768972a',
  },
  {
    name: 'Steam',
    nameAr: 'Steam',
    icon: 'steam',
    url: 'https://steamcommunity.com/id/abdul85524/',
    color: '#1b2838',
    username: 'abdul85524',
    usernameAr: 'abdul85524',
  },
  {
    name: 'Discord',
    nameAr: 'Discord',
    icon: 'discord',
    url: 'https://discord.com/users/abdulkarim8552',
    color: '#5865F2',
    username: 'abdulkarim8552',
    usernameAr: 'abdulkarim8552',
  },
  {
    name: 'Phone',
    nameAr: 'هاتف',
    icon: 'phone',
    url: 'tel:+963948579158',
    color: '#00d4aa',
    username: '+963 948 579 158',
    usernameAr: '+963 948 579 158',
    isPhone: true,
  },
  {
    name: 'Email',
    nameAr: 'بريد إلكتروني',
    icon: 'email',
    url: 'mailto:abdulkarim.mmx@gmail.com',
    color: '#EA4335',
    username: 'abdulkarim.mmx@gmail.com',
    usernameAr: 'abdulkarim.mmx@gmail.com',
  },
];

const myLinks: { name: string; nameAr: string; icon: string; url: string; color: string; username: string; usernameAr: string }[] = [
  {
    name: 'Discord Server',
    nameAr: 'Discord Server',
    icon: 'discord',
    url: 'https://discord.gg/VqAweVa5Xa',
    color: '#5865F2',
    username: 'Star Community',
    usernameAr: 'Star Community',
  },
];

// ─── SVG Icons ──────────────────────────────────────────────────
function DiscordIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function GitHubIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YouTubeIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function SteamIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.009l.001.023zM21.26 8.915c0-1.577-1.282-2.858-2.861-2.858-1.578 0-2.86 1.282-2.86 2.86 0 1.579 1.282 2.861 2.86 2.861 1.579-.001 2.861-1.283 2.861-2.863zm-5.041-.005c0-1.205.981-2.186 2.186-2.186 1.205 0 2.186.981 2.186 2.186s-.981 2.186-2.186 2.186c-1.205-.001-2.186-.982-2.186-2.186z"/>
    </svg>
  );
}

function EmailIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );
}

function PhoneIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}

function CodeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

function SparklesIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4"></path>
      <path d="M19 17v4"></path>
      <path d="M3 5h4"></path>
      <path d="M17 19h4"></path>
    </svg>
  );
}

function UsersIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

function ExternalLinkIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6"></path>
      <path d="M10 14 21 3"></path>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </svg>
  );
}

function GlobeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
      <path d="M2 12h20"></path>
    </svg>
  );
}

function LinkIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );
}

function ChevronDownIcon({ className = 'w-4 h-4', open }: { className?: string; open?: boolean }) {
  return (
    <svg className={`${className} transition-transform duration-300 ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}

function getSocialIcon(icon: string, className?: string) {
  const cls = className || 'w-6 h-6';
  switch (icon) {
    case 'discord': return <DiscordIcon className={cls} />;
    case 'github': return <GitHubIcon className={cls} />;
    case 'instagram': return <InstagramIcon className={cls} />;
    case 'youtube': return <YouTubeIcon className={cls} />;
    case 'steam': return <SteamIcon className={cls} />;
    case 'phone': return <PhoneIcon className={cls} />;
    case 'email': return <EmailIcon className={cls} />;
    default: return null;
  }
}

// ─── Language Toggle Button ────────────────────────────────────
function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full glass cursor-pointer hover:bg-white/10 transition-all group"
      aria-label="Toggle language"
    >
      <GlobeIcon className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" />
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {lang === 'ar' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}

// ─── Loading Screen ─────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#0a0e1a' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-20 h-20 mb-6 rounded-full overflow-hidden">
        <Image
          src="/logo.jpg"
          alt="Logo"
          fill
          className="object-cover rounded-full"
          priority
        />
      </div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(90deg, #5865F2, #00d4aa)',
          }}
        />
      </div>
      <p className="text-white/40 text-sm mt-3 font-mono"><T k="loading" /></p>
    </motion.div>
  );
}

// ─── Mouse Glow Effect ─────────────────────────────────────────
function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-10 transition-transform duration-100"
      style={{
        width: '300px',
        height: '300px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(88,101,242,0.08) 0%, transparent 70%)',
      }}
    />
  );
}

// ─── Skills Data ────────────────────────────────────────────
const skills = [
  {
    icon: '🌐',
    titleKey: 'skill1Title',
    descKey: 'skill1Desc',
    color: '#00d4aa',
  },
  {
    icon: '🏢',
    titleKey: 'skill2Title',
    descKey: 'skill2Desc',
    color: '#5865F2',
  },
  {
    icon: '🤖',
    titleKey: 'skill3Title',
    descKey: 'skill3Desc',
    color: '#FFB800',
  },
  {
    icon: '📢',
    titleKey: 'skill4Title',
    descKey: 'skill4Desc',
    color: '#E1306C',
  },
];

// ─── Main Page ───────────────────────────────────────────────────
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Lang>('ar');
  const [servicesExpanded, setServicesExpanded] = useState(true);

  const toggleLang = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <LangContext.Provider value={{ lang, toggle: toggleLang }}>
      <main className="noise-overlay min-h-screen relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Background */}
        <SnowBackground />
        <MouseGlow />

        {/* Language Toggle */}
        <LangToggle />

        {/* Loading Screen */}
        <AnimatePresence>
          {loading && (
            <LoadingScreen onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        {/* Content */}
        {!loading && (
          <div className="relative z-20 bio-container pb-8">
            {/* Hero Section */}
            <motion.section
              className="flex flex-col items-center text-center pt-12 sm:pt-16 pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Logo */}
              <motion.div
                className="relative w-28 h-28 sm:w-32 sm:h-32 mb-6 animate-pulse-glow rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-transparent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
              >
                <Image
                  src="/logo.jpg"
                  alt="Abdulkarim Taha Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Name — Cormorant Garamond elegant font */}
              <motion.h1
                className="text-4xl sm:text-5xl font-semibold text-gradient mb-2"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Abdulkarim Taha
              </motion.h1>

              {/* Title lines */}
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2">
                  <CodeIcon className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm sm:text-base text-muted-foreground">
                    <T k="nameTitle" />
                  </span>
                </div>
                <motion.div
                  className="flex items-center gap-2 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-primary/60" />
                  <span className="text-xs text-primary/80 font-medium">
                    <T k="founderLine" />
                  </span>
                  <SparklesIcon className="w-3.5 h-3.5 text-primary/60" />
                </motion.div>
              </motion.div>

              {/* Status indicator */}
              <motion.div
                className="flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full glass"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-muted-foreground"><T k="available" /></span>
              </motion.div>
            </motion.section>

            {/* About Section */}
            <motion.section
              className="glass rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CodeIcon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-gradient"><T k="aboutTitle" /></h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <T k="aboutDesc" />
              </p>
            </motion.section>

            {/* Skills Section — expandable */}
            <motion.section
              className="glass rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {/* Header — clickable */}
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="w-full flex items-center justify-between gap-3 mb-0 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-start">
                    <h2 className="text-lg font-semibold text-gradient"><T k="skillsTitle" /></h2>
                    <p className="text-xs text-muted-foreground/60 mt-0.5"><T k="skillsSubtitle" /></p>
                  </div>
                </div>
                <ChevronDownIcon
                  className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary/60 transition-colors"
                  open={servicesExpanded}
                />
              </button>

              {/* Expandable skills list */}
              <AnimatePresence>
                {servicesExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2.5 pt-4">
                      {skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                          initial={{ opacity: 0, x: lang === 'ar' ? 15 : -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
                            style={{ backgroundColor: `${skill.color}15` }}
                          >
                            {skill.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground/90 mb-1">
                              <T k={skill.titleKey} />
                            </p>
                            <p className="text-xs text-muted-foreground/70 leading-relaxed">
                              <T k={skill.descKey} />
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            {/* Connect Section — Discord + GitHub + Steam + Phone */}
            <motion.section
              className="glass rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-gradient"><T k="connectTitle" /></h2>
              </div>

              <div className="space-y-3">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.isPhone || link.icon === 'email' ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="link-card flex items-center gap-4 p-4 rounded-xl glass cursor-pointer group"
                    initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.08 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ backgroundColor: `${link.color}20` }}
                    >
                      <div style={{ color: link.color }}>
                        {getSocialIcon(link.icon)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground/90">{lang === 'ar' ? link.nameAr : link.name}</p>
                      <p className={`text-xs text-muted-foreground truncate ${link.isPhone || link.icon === 'email' ? 'dir-ltr' : ''}`} dir={(link.isPhone || link.icon === 'email') ? 'ltr' : undefined}>{lang === 'ar' ? link.usernameAr : link.username}</p>
                    </div>
                    {link.isPhone || link.icon === 'email' ? (
                      link.icon === 'email' ? <EmailIcon className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0" /> : <PhoneIcon className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0" />
                    ) : (
                      <ExternalLinkIcon className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0" />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* My Links Section — Discord Server */}
            <motion.section
              className="glass rounded-2xl p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <LinkIcon className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-gradient"><T k="linksTitle" /></h2>
              </div>

              <div className="space-y-3">
                {myLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-card flex items-center gap-4 p-4 rounded-xl glass cursor-pointer group"
                    initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + i * 0.08 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ backgroundColor: `${link.color}20` }}
                    >
                      <div style={{ color: link.color }}>
                        {getSocialIcon(link.icon)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground/90">{lang === 'ar' ? link.nameAr : link.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{lang === 'ar' ? link.usernameAr : link.username}</p>
                    </div>
                    <ExternalLinkIcon className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/60 transition-colors flex-shrink-0" />
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/10"></div>
                <span className="text-xs text-muted-foreground/40">✦</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/10"></div>
              </div>
              <p className="text-xs text-muted-foreground/30">
                <T k="footer" />
              </p>
            </motion.footer>
          </div>
        )}
      </main>
    </LangContext.Provider>
  );
}
