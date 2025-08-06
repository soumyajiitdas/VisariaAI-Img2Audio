import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  ArrowUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const developer = {
    name: "Soumyajit Das",
    role: "Aspiring Developer | AI + Audio Integration | Accessibility Engineer",
    github: "https://github.com/soumyajiitdas",
    linkedin: "https://linkedin.com/in/soumyajit4119",
    instagram: "https://instagram.com/soumyajiit_",
    twitter: "https://x.com/soumyajiit_",
    facebook: "https://facebook.com/soumyajit4119",
    email: "mailto:soumyajit302@gmail.com",
  };

  const socialIcons = [
    { Icon: Github, url: developer.github, title: "GitHub" },
    { Icon: Linkedin, url: developer.linkedin, title: "LinkedIn" },
    { Icon: Instagram, url: developer.instagram, title: "Instagram" },
    { Icon: Twitter, url: developer.twitter, title: "X (Twitter)" },
    { Icon: Facebook, url: developer.facebook, title: "Facebook" },
    { Icon: Mail, url: developer.email, title: "Email" },
  ];

  return (
    <motion.div 
      className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 text-text"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-center decoration-primary mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        📢 About VisariaAI ✨
      </motion.h1>
      <motion.p variants={itemVariants} className="text-center max-w-xl mx-auto text-md sm:text-lg italic text-secondary mb-12">
        “Not every eye can see, but every mind deserves to know.”
      </motion.p>

      <motion.div className="space-y-8" variants={containerVariants}>
        <InfoCard title="🚨 The Problem" variants={itemVariants}>
          Millions of visually impaired individuals struggle to access visual content online. Screen readers help, but cannot interpret images meaningfully. VisariaAI bridges this gap by converting images into speech — in multiple languages.
        </InfoCard>

        <InfoCard title="🎯 My Mission" variants={itemVariants}>
          VisariaAI exists to make digital content inclusive, especially for those often overlooked by mainstream design. Our goal: bring vision to sound — with clarity, emotion, and human-first design.
        </InfoCard>
      </motion.div>

      <motion.div className="grid md:grid-cols-2 gap-8 mt-12" variants={containerVariants}>
        <InfoCard title="⚙️ How It Works" variants={itemVariants}>
          VisariaAI uses a powerful vision-language model (BLIP) to generate captions for any uploaded image. These captions are then converted into natural-sounding speech using gTTS or pyttsx3, with optional language translation powered by Google Translate.
        </InfoCard>

        <InfoCard title="🌍 My Vision" variants={itemVariants}>
          We envision a world where artificial intelligence doesn’t just work for convenience — it works for equity. A world where every screen becomes a voice, and every image is understandable to everyone, regardless of sight.
        </InfoCard>
      </motion.div>

      <motion.div className="mt-12" variants={itemVariants}>
        <InfoCard title="🤔 Who It’s For">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Visually impaired and low-vision users</li>
            <li>Accessibility-first product developers</li>
            <li>Educators and researchers</li>
            <li>Students in resource-constrained settings</li>
            <li>Developers building inclusive platforms</li>
          </ul>
        </InfoCard>
      </motion.div>

      <motion.div className="mt-16" variants={itemVariants}>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-primary text-center md:text-left">👨🏻‍💻 Meet The Developer</h2>
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6 p-6 border border-card-border rounded-xl shadow-md bg-card hover:scale-[1.01] transition-transform duration-200">
          <img
            src="https://github.com/soumyajiitdas.png"
            alt={developer.name}
            className="w-24 h-24 rounded-full border-2 border-primary mb-4 md:mb-0"
          />
          <div className="flex-1">
            <p className="text-lg sm:text-xl font-semibold text-primary">
              {developer.name}
            </p>
            <p className="text-sm text-secondary mt-1 max-w-md mx-auto md:mx-0">{developer.role}</p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start text-text">
              {socialIcons.map(({ Icon, url, title }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="hover:text-primary transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p variants={itemVariants} className="text-center text-sm sm:text-base mt-10 italic text-secondary">
        Aiming to make vision audible. ❤️✨
      </motion.p>

      {showScroll && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 p-3 bg-button text-button-text rounded-full shadow-lg hover:bg-button-hover transition"
          aria-label="Scroll to top"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </motion.div>
  );
}

function InfoCard({ title, children, variants }) {
  return (
    <motion.section 
      className={`
        border-l-4 border-primary pl-4 pr-2 py-4 sm:py-6 sm:px-5 rounded-r-lg
        bg-card/60
        dark:bg-card
        dark:border border border-card-border
        dark:shadow-[0_0_6px_rgba(255,255,255,0.05)]
        backdrop-blur-sm
        transition-all
      `}
      variants={variants}
    >
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary">{title}</h2>
      <div className="text-sm sm:text-base leading-relaxed">{children}</div>
    </motion.section>
  );
}



