import { type ImgHTMLAttributes, useEffect, useRef, useState } from "react";
import styles from "./lazy-image.module.scss";

type LazyImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  wrapperClassName?: string;
};

const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  onLoad,
  ...props
}: LazyImageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${wrapperClassName ?? ""}`.trim()}
    >
      {!isLoaded && <div className={styles.placeholder} aria-hidden="true" />}
      {shouldLoad ? (
        <img
          {...props}
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoaded ? styles.loaded : ""} ${className ?? ""}`.trim()}
          loading="lazy"
          onLoad={(event) => {
            setIsLoaded(true);
            onLoad?.(event);
          }}
        />
      ) : null}
    </div>
  );
};

export default LazyImage;
