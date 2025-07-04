import { useState, useRef } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  // const [audioUrl, setAudioUrl] = useState(null);
  const [language, setLanguage] = useState('en');
  const dropRef = useRef();

  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      setCaption('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUpload = async () => {
    if (!image) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/caption', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      let finalCaption = data.caption || 'No caption returned.';

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
    } catch (e) {
      console.error(e);
      setCaption('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fffdf6] dark:bg-gradient-to-br dark:from-[#121207] dark:to-[#151105] 
      p-6 rounded-xl shadow-md border border-yellow-300 dark:border-yellow-500 max-w-2xl mx-auto transition">

      <h2 className="text-3xl font-bold text-center mb-4 text-yellow-700 dark:text-yellow-300">
        🖼️ Upload an Image
      </h2>

      <p className="text-center text-sm text-gray-600 dark:text-yellow-200 mb-6">
        Drag an image here or click below to upload. Caption will be spoken aloud.
      </p>

      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700 dark:text-yellow-100">
          Select Language:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-yellow-400 dark:border-yellow-600 
            bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-yellow-100 transition"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-yellow-400 rounded-md p-6 mb-4 text-center dark:text-yellow-100 cursor-pointer"
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
        <div className="mb-6 rounded-md overflow-hidden bg-[#fafafa] dark:bg-[#111111] flex justify-center items-center max-h-80">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className={`max-h-80 w-auto rounded-md border shadow-md ${loading ? 'blur-sm brightness-75' : ''}`}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 px-4 font-semibold text-black rounded-md transition 
          ${loading ? 'bg-yellow-300 cursor-wait' : 'bg-yellow-500 hover:bg-yellow-600'}`}
      >
        {loading ? <span className="animate-pulse">Loading...</span> : '🔍 Generate Caption'}
      </button>

      {caption && (
        <div className="mt-8 text-center space-y-4">
          <div className="text-base dark:text-yellow-100">
            <span className="block text-sm text-gray-500 dark:text-yellow-400">Caption:</span>
            <div className="font-medium italic">{caption}</div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={async () => {
                const formData = new FormData();
                formData.append('text', caption);
                formData.append('language', language);
                const response = await fetch('http://localhost:8000/tts', {
                  method: 'POST',
                  body: formData,
                });
                const blob = await response.blob();
                const audioUrl = URL.createObjectURL(blob);
                const audio = new Audio(audioUrl);
                audio.preload = 'auto';

                // Wait until browser is ready, then manually delay 300ms
                audio.addEventListener('canplaythrough', () => {
                  setTimeout(() => {
                    audio.play().catch(console.error);
                  }, 300);
                }, { once: true });

                // Preload + load to trigger `canplaythrough` reliably
                audio.load();
              }}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition"
            >
              🔊 Play Audio
            </button>

            {/* <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = audioUrl; // make sure audioUrl is in state
                link.download = 'visaria_caption.mp3';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // Toast notification
                const toast = document.createElement('div');
                toast.innerText = '✅ Audio downloaded!';
                toast.className = 'fixed bottom-6 right-6 bg-yellow-600 text-black px-4 py-2 rounded shadow-md animate-fade-in-up';
                document.body.appendChild(toast);
                setTimeout(() => {
                  toast.remove();
                }, 2000);
              }}
              className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-mid transition"
              title="Download audio"
            >
              ⏬
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
