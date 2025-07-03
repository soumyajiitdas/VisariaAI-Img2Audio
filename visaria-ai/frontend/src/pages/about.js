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
    <div className="relative max-w-6xl mx-auto px-6 py-14 text-[#181818] dark:text-[#f5f5f5]">
      <h1 className="text-5xl font-extrabold text-center decoration-yellow-400 mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-fade-in-up">
        📢 About VisariaAI ✨
      </h1>
      <p className="text-center max-w-xl mx-auto text-lg italic text-gray-600 dark:text-gray-400 mb-12 animate-fade-in-up delay-100">
        “Not every eye can see, but every mind deserves to know.”
      </p>

      {/* Alternate Layout 1 */}
      <div className="space-y-10">
        <InfoCard title="🚨 The Problem">
          Millions of visually impaired individuals struggle to access visual content online. Screen readers help, but cannot interpret images meaningfully. VisariaAI bridges this gap by converting images into speech — in multiple languages.
        </InfoCard>

        <InfoCard title="🎯 My Mission">
          VisariaAI exists to make digital content inclusive, especially for those often overlooked by mainstream design. Our goal: bring vision to sound — with clarity, emotion, and human-first design.
        </InfoCard>
      </div>

      {/* Alternate Layout 2 - Grid */}
      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <InfoCard title="⚙️ How It Works">
          VisariaAI uses a powerful vision-language model (BLIP) to generate captions for any uploaded image. These captions are then converted into natural-sounding speech using gTTS or pyttsx3, with optional language translation powered by Google Translate.
        </InfoCard>

        <InfoCard title="🌍 My Vision">
          We envision a world where artificial intelligence doesn’t just work for convenience — it works for equity. A world where every screen becomes a voice, and every image is understandable to everyone, regardless of sight.
        </InfoCard>
      </div>

      {/* Target Audience */}
      <div className="mt-14">
        <InfoCard title="🤔 Who It’s For">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Visually impaired and low-vision users</li>
            <li>Accessibility-first product developers</li>
            <li>Educators and researchers</li>
            <li>Students in resource-constrained settings</li>
            <li>Developers building inclusive platforms</li>
          </ul>
        </InfoCard>
      </div>

      {/* Developer Card */}
      <div className="mt-16 animate-fade-in-up delay-100">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-600 dark:text-yellow-400">👨🏻‍💻 Meet The Developer</h2>
        <div className="flex items-center gap-6 p-6 border border-yellow-300 dark:border-yellow-500 rounded-xl shadow-md bg-[#fffdf6] dark:bg-[#0a0a0a] hover:scale-[1.015] transition-transform duration-200">
          <img
            src="https://github.com/soumyajiitdas.png"
            alt={developer.name}
            className="w-24 h-24 rounded-full border-2 border-yellow-500"
          />
          <div>
            <p className="text-xl font-semibold text-yellow-700 dark:text-yellow-400">
              {developer.name}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{developer.role}</p>
            <div className="flex gap-4 mt-3 text-gray-800 dark:text-gray-200">
              {socialIcons.map(({ Icon, url, title }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="hover:text-yellow-600 dark:hover:text-yellow-400 transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-base mt-10 italic text-gray-600 dark:text-gray-400">
        Aiming to make vision audible. ❤️✨
      </p>

      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 bg-yellow-500 text-black rounded-full shadow-lg hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

// InfoCard with elegant styling
function InfoCard({ title, children }) {
  return (
    <section className="
      border-l-4 border-yellow-500 pl-4 ml-1 py-6 px-5 rounded-xl
      bg-white/60
      dark:bg-[#1f1f1f]
      dark:border border border-[#2c2c2c]
      dark:shadow-[0_0_6px_rgba(255,255,255,0.05)]
      backdrop-blur-sm
      animate-fade-in-up
      transition-all
    ">
      <h2 className="text-xl font-bold mb-3 text-yellow-700 dark:text-yellow-300">{title}</h2>
      <div className="text-base leading-relaxed">{children}</div>
    </section>
  );
}



