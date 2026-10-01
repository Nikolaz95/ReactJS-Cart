import React from 'react'


//import css
import styles from './Loading.module.css';


/* Skeleton cards shown while the desserts are loading */
const Loading = ({ count = 6 }) => {
    return (
        <div className={`productGrid ${styles.loaderContainer}`} role="status" aria-label="Loading desserts">
            {Array.from({ length: count }, (_, i) => (
                <div className={styles.skeletonCard} key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className={`${styles.shimmer} ${styles.skeletonImage}`} />
                    <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.short}`} />
                    <div className={`${styles.shimmer} ${styles.skeletonLine}`} />
                    <div className={`${styles.shimmer} ${styles.skeletonLine} ${styles.price}`} />
                </div>
            ))}
        </div>
    )
}

export default Loading
