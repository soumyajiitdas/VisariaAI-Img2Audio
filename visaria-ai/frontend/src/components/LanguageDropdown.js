import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
];

export default function LanguageDropdown({ selectedLanguage, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLangName = languages.find(l => l.code === selectedLanguage)?.name || 'Select Language';

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className="block mb-2 font-medium text-text">
        Select Language 🌐:
      </label>
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-4 py-3 text-left bg-input border border-input-border rounded-lg shadow-sm flex items-center justify-between transition-all duration-300 ease-in-out focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <span className="text-text">{selectedLangName}</span>
        <ChevronDown
          size={20}
          className={`text-secondary transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-card border border-card-border rounded-lg shadow-xl transition-all duration-300 ease-in-out animate-fade-in-up">
          <ul className="py-1">
            {languages.map((lang) => (
              <li
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className="px-4 py-2 text-text hover:bg-button-hover hover:text-button-text cursor-pointer flex items-center justify-between"
              >
                <span>{lang.name}</span>
                {selectedLanguage === lang.code && <Check size={20} className="text-primary" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
