import ImageUpload from '../components/ImageUpload';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-4xl font-extrabold text-text sm:text-5xl md:text-6xl animate-fade-in-up whitespace-nowrap">
          Image to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Audio</span>
        </h2>
        <p className="mt-2 text-lg text-secondary">
          Upload an image and let AI describe it and convert the description to speech.
        </p>
      </div>
      <div className="mt-10 w-full max-w-4xl">
        <ImageUpload />
      </div>
    </div>
  );
}



