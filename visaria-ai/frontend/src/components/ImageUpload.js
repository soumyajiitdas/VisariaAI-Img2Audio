import { useState } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');     // default: English 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setCaption('');
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    try {
      // Step 1: Generate English caption
      const response = await fetch("http://localhost:8000/caption", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const englishCaption = data.caption || "No caption returned.";

      // Step 2: Translate caption if needed
      let finalCaption = englishCaption;

      if (language !== "en") {
        const translateForm = new FormData();
        translateForm.append("text", englishCaption);
        translateForm.append("target_lang", language);

        const transRes = await fetch("http://localhost:8000/translate", {
          method: "POST",
          body: translateForm,
        });

        const transData = await transRes.json();
        if (transData.translated_text) {
          finalCaption = transData.translated_text;
        }
      }

      // Step 3: Set the final caption (translated or original)
      setCaption(finalCaption);

    } catch (err) {
      console.error(err);
      setCaption("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl mx-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">
        Upload an Image
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
        Select an image from your device. It will be processed by our AI to generate a description.
      </p>

      <div className="mb-4">
        <label className="block mb-1 font-medium text-gray-700 dark:text-white">
          Select Language:
        </label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700
                    text-gray-800 dark:text-gray-200
                    border border-gray-300 dark:border-gray-600
                    rounded-md transition"
        >

          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
        </select>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full mb-4 text-sm
          text-gray-800 dark:text-gray-300
          bg-gray-100 dark:bg-gray-700
          border border-gray-300 dark:border-gray-600
          rounded-md file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0 file:text-sm
          file:bg-blue-600 file:text-white hover:file:bg-blue-700
          cursor-pointer"
      />

      {image && (
        <div className="w-full max-h-80 overflow-hidden flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-md">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className={`max-h-80 w-auto mx-auto rounded-md border shadow ${loading ? 'blur-sm brightness-75' : ''}`}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 px-4 text-white font-semibold rounded-md transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Generating Caption...' : 'Generate Caption'}
      </button>

      {caption && (
        <div className="mt-6 text-center text-gray-800 dark:text-white font-medium space-y-4">
          <div>
            <span className="block text-sm text-gray-500 dark:text-gray-300">Caption:</span>
            “{caption}”
          </div>

          {/* Play Audio Button */}
          <button
            onClick={async () => {
              const formData = new FormData();
              formData.append("text", caption);
              formData.append("language", language);

              const response = await fetch("http://localhost:8000/tts", {
                method: "POST",
                body: formData,
              });

              const blob = await response.blob();
              const audioUrl = URL.createObjectURL(blob);
              const audio = new Audio(audioUrl);
              audio.play();
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
          >
            🔊 Play Audio
          </button>
        </div>
      )}

    </div>
  );
}


