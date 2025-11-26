import { useState } from 'react';
import styles from './BookCoverImage.module.css';

function BookCoverImage({ src, alt, className }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`${styles.imageContainer} ${className || ''}`}>
      {isLoading && (
        <div className={styles.skeleton}>
          <div className={styles.pulse}></div>
        </div>
      )}
      <img
        src={hasError ? `https://source.unsplash.com/400x600/?book,literature` : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${styles.image} ${isLoading ? styles.hidden : styles.visible}`}
      />
    </div>
  );
}

export default BookCoverImage;
