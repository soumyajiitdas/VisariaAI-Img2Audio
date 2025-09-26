import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export default function LanguageDropdown({ selectedLanguage, onLanguageChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0) {
          handleLanguageSelect(languages[focusedIndex].code);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => 
            prev < languages.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(languages.length - 1);
        } else {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : languages.length - 1
          );
        }
        break;
      case 'Home':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(0);
        }
        break;
      case 'End':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(languages.length - 1);
        }
        break;
    }
  };

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
    
    // Announce selection to screen readers
    const selectedLangName = languages.find(lang => lang.code === langCode)?.name;
    const announcement = `Selected language: ${selectedLangName}`;
    announceToScreenReader(announcement);
  };

  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.textContent = message;
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label 
        id="language-label"
        className="block mb-3 text-lg font-bold text-text"
      >
        <Globe className="inline-block mr-2" size={24} aria-hidden="true" />
        Select Language:
      </label>
      
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full px-6 py-4 text-left bg-input border-4 border-input-border rounded-xl 
          flex items-center justify-between large-click-target
          focus:outline-none focus:ring-4 focus:ring-focus transition-all duration-300
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-primary hover:bg-card cursor-pointer'
          }
        `}
        aria-labelledby="language-label"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-describedby="language-description"
      >
        <span className="text-lg font-medium text-text">
          {selectedLang.name} ({selectedLang.nativeName})
        </span>
        {isOpen ? (
          <ChevronUp size={24} className="text-secondary" aria-hidden="true" />
        ) : (
          <ChevronDown size={24} className="text-secondary" aria-hidden="true" />
        )}
      </button>

      <p id="language-description" className="sr-only">
        Select the language for caption translation and audio generation. 
        Use arrow keys to navigate, Enter to select, Escape to close.
      </p>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-input border-4 border-input-border rounded-xl shadow-2xl z-50"
          role="listbox"
          aria-labelledby="language-label"
        >
          {languages.map((language, index) => (
            <button
              key={language.code}
              type="button"
              onClick={() => handleLanguageSelect(language.code)}
              className={`
                w-full px-6 py-4 text-left hover:bg-card focus:bg-card 
                flex items-center justify-between large-click-target
                focus:outline-none transition-colors duration-200
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === languages.length - 1 ? 'rounded-b-lg' : ''}
                ${focusedIndex === index ? 'bg-primary text-button-text font-bold' : 'text-text'}
                ${selectedLanguage === language.code ? 'font-bold bg-card' : ''}
              `}
              role="option"
              aria-selected={selectedLanguage === language.code}
              tabIndex={-1}
            >
              <span className="text-lg">
                {language.name} ({language.nativeName})
              </span>
              {selectedLanguage === language.code && (
                <span className="text-primary font-bold" aria-label="Currently selected">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        {isOpen && `Language dropdown opened. ${languages.length} options available. Use arrow keys to navigate.`}
      </div>
    </div>
  );
}