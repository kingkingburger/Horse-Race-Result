import styles from "@/app/loading.module.css";

export default function loading () {
    return(
        // <div className="flex flex-wrap justify-center space-x-2 min-w-[400px]">
        //     로딩중입니다.
        // </div>
        <div className={styles.container}>
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}