import style from "./gallery-header.module.scss";

type IGalleryHeader = {
  dishCount: number;
  label: "dish" | "dishes";
};

const GalleryHeader = ({ dishCount, label }: IGalleryHeader) => (
  <div className="flex items-baseline gap-4 mb-7">
    <span className={style.galleryTitle}>My Collection</span>
    <span className={style.galleryCount} id="galleryCount">
      {dishCount} {label}
    </span>
  </div>
);

export default GalleryHeader;
