import '../styles/globals.css';
import Layout from '../components/Layout';      // layout wrapper

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}




