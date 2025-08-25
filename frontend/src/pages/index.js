import ImageUpload from '../components/ImageUpload';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <motion.div
      className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-lg w-full space-y-6 text-center" variants={itemVariants}>
        <h2 className="text-3xl font-extrabold text-text sm:text-4xl md:text-5xl">
          Image to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Audio🎵</span>
        </h2>
        <p className="mt-2 text-base text-secondary sm:text-lg">
          Upload an image and let AI describe it and convert the description to speech.
        </p>
      </motion.div>
      <motion.div className="mt-8 w-full max-w-4xl" variants={itemVariants}>
        <ImageUpload />
      </motion.div>
    </motion.div>
  );
}
