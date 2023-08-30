import styles from '../loading.module.css'

export default function Loading() {
    return (
        // <div>
        //     <p className="flex justify-center mt-3 w-full sm:w-1/2 text-3xl"> Posts</p>
        //     <ul className="flex justify-center mt-3 w-full sm:w-1/2 list-disc pl-6 mt-6 space-y-2">
        //         {Array(20).map((i) => (
        //             <li key={i}>
        //                 <span className="inline-block h-5 animate-pulse"
        //                       style={{
        //                           animationDelay: `${i * 0.05}s`,
        //                           animationDuration: '1s'
        //                       }}
        //                 />
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div className={styles.container}>
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
            </div>
        </div>
    )
}