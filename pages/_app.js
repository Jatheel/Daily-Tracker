// This is the custom App component that wraps every page.
// We import global Tailwind styles here and apply a shared Layout with nav.
import "../styles/globals.css";
import Layout from "../src/components/Layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
