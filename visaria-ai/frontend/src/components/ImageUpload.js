import { useState, useRef, useEffect } from 'react';
import { Play, Download } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown'; // Import the new component

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dropRef = useRef();

  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      setCaption('');
      setAudioUrl(null); // Reset audio when new image is selected
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const playAudio = (url) => {
    setIsPlaying(true);
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.addEventListener('canplaythrough', () => {
      setTimeout(() => {
        audio.play().catch(console.error);
      }, 300);
    }, { once: true });
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.load();
  };

  const handleDownload = async () => {
    if (!audioUrl) return;
    setIsDownloading(true);
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'caption_audio.mp3';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('😵 Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUpload = async () => {
    if (!image) return alert('😕 Please select an image.');

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/caption', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      let finalCaption = data.caption || '😵‍💫 No caption returned..';

      if (language !== 'en') {
        const translateForm = new FormData();
        translateForm.append('text', finalCaption);
        translateForm.append('target_lang', language);

        const transRes = await fetch('http://localhost:8000/translate', {
          method: 'POST',
          body: translateForm,
        });

        const transData = await transRes.json();
        if (transData.translated_text) {
          finalCaption = transData.translated_text;
        }
      }

      setCaption(finalCaption);

      // Automatically play audio
      const audioFormData = new FormData();
      audioFormData.append('text', finalCaption);
      audioFormData.append('language', language);
      const audioResponse = await fetch('http://localhost:8000/tts', {
        method: 'POST',
        body: audioFormData,
      });
      const audioBlob = await audioResponse.blob();
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(newAudioUrl);
      playAudio(newAudioUrl);
    } catch (e) {
      console.error(e);
      setCaption('😵 Something went wrong..');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-card-border max-w-2xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-[1.01]">

      <h2 className="text-3xl font-bold text-center mb-4 text-primary">
        Upload an Image 🖼️
      </h2>

      <p className="text-center text-sm text-secondary mb-6">
        Select or drag-and-drop an image from your device. It will be processed by AI to generate a description with playable audio.
      </p>

      <div className="mb-5">
        <LanguageDropdown 
          selectedLanguage={language} 
          onLanguageChange={setLanguage} 
        />
      </div>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-input-border rounded-md p-6 mb-4 text-center text-text cursor-pointer transition-all duration-300 ease-in-out hover:border-primary hover:bg-card-border/50"
        onClick={() => document.getElementById('fileInput').click()}
      >
        Drag and drop your image here or click to browse
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files[0])}
          className="hidden"
        />
      </div>

      {image && (
        <div className="mb-6 rounded-md overflow-hidden bg-card flex justify-center items-center max-h-80 shadow-md">
          <img
            src={URL.createObjectURL(image)}
            className={`max-h-80 w-auto rounded-md ${loading ? 'blur-sm brightness-75' : ''}`}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-3 px-4 font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105
          ${loading ? 'bg-secondary text-text cursor-wait' : 'bg-button text-button-text hover:bg-button-hover'}`}
      >
        {loading ? <span className="animate-pulse">🤔 Thinking...</span> : '🔍 Generate Caption'}
      </button>

      {caption && (
        <div className="mt-8 text-center space-y-4">
          <div className="text-base text-text">
            <span className="block text-sm text-secondary">Caption:</span>
            <div className="font-medium">" {caption}. "</div>
          </div>

          <div className="flex justify-center items-center gap-4">
            {audioUrl && (
              <button
                onClick={() => playAudio(audioUrl)}
                disabled={isPlaying}
                className="px-4 py-2 bg-button text-button-text font-semibold rounded-md transition-all duration-300 ease-in-out hover:bg-button-hover transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                {isPlaying ? '🎶 Playing...' : <><Play size={20} /> Play Again</>}
              </button>
            )}
            {audioUrl && (
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-4 py-2 bg-button text-button-text font-semibold rounded-md transition-all duration-300 ease-in-out hover:bg-button-hover transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                {isDownloading ? '🚀 Downloading...' : <><Download size={20} /> Download Audio</>}
              </button>
            )}
          </div>
        </div>
      )}

      </div>
  );
}
