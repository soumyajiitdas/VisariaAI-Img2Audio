import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Mail,
} from "lucide-react";

export default function About() {
  const developer = {
    name: "Soumyajit Das",
    role: "Aspiring Developer | AI + Audio Integration | Accessibility Engineer",
    github: "https://github.com/soumyajiitdas",
    linkedin: "https://linkedin.com/in/soumyajit4119",
    instagram: "https://instagram.com/soumyajiitdas",
    twitter: "https://x.com/soumyajiitdas",
    facebook: "https://facebook.com/soumyajiitdas",
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
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center text-purple-700 dark:text-purple-400">
        🔊 About VisariaAI
      </h1>

      {/* Problem */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">🚨 The Problem</h2>
        <p className="text-lg leading-relaxed">
          Millions of visually impaired individuals struggle to access visual content online. Screen readers help, but cannot interpret images meaningfully. VisariaAI bridges this gap by converting images into speech — in multiple languages.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">⚙️ How It Works</h2>
        <p className="text-lg leading-relaxed">
          VisariaAI uses a powerful vision-language model (BLIP) to generate captions for any uploaded image. These captions are then converted into natural-sounding speech using gTTS or pyttsx3, with optional language translation powered by Google Translate. The entire pipeline is seamless and accessible via a clean web interface.
        </p>
      </section>

      {/* Target Audience */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">🤔 Who It’s For</h2>
        <ul className="list-disc list-inside text-base ml-4">
          <li>Visually impaired and low-vision users</li>
          <li>Accessibility-first product developers</li>
          <li>Educators and researchers</li>
          <li>Students in resource-constrained settings</li>
          <li>Developers building inclusive platforms</li>
        </ul>
      </section>

      {/* Mission */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">🎯 My Mission</h2>
        <p className="text-lg leading-relaxed">
          VisariaAI exists to make digital content inclusive, especially for those who are often overlooked by mainstream design. Our mission is to bring vision to sound — with clarity, emotion, and human-first design.
        </p>
      </section>

      {/* Vision */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">🌍 My Vision</h2>
        <p className="text-lg leading-relaxed">
          We envision a world where artificial intelligence doesn't just work for convenience — it works for equity. A world where a screen becomes a voice, and every image becomes understandable to everyone, regardless of sight.
        </p>
      </section>

      {/* Developer */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-5">👨🏻‍💻 Meet The Developer</h2>
        <div className="flex items-center gap-5 p-5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <img
            src={`https://github.com/soumyajiitdas.png`}
            alt={developer.name}
            className="w-20 h-20 rounded-full border border-gray-400 dark:border-gray-600"
          />
          <div className="flex flex-col gap-2">
            <p className="text-xl font-semibold text-purple-700 dark:text-purple-400">
              {developer.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{developer.role}</p>
            <div className="flex gap-4 mt-2 text-gray-700 dark:text-gray-200">
              {socialIcons.map(({ Icon, url, title }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="hover:text-purple-500 transition"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <p className="text-center text-lg italic text-gray-600 dark:text-gray-400">
        Aiming to make vision audible.❤️
      </p>
    </div>
  );
}

