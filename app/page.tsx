import Image from "next/image";
import styles from "./page.module.css";
import { App } from "@/app/components/App/App"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <App />
      </div>
    </main>
  );
}
