import dynamic from "next/dynamic";
import styles from "./page.module.css";
const App = dynamic(() => import('./components/App/App'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <App />
      </div>
    </main>
  );
}
