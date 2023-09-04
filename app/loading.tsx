import styles from "@/app/loading.module.css";

export default function loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}
