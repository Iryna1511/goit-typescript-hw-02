// import { forwardRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ data, openModal }) {
  return (
    <ul className={css.gallery}>
      {data.map((image) => {
        return (
          <li className={css.item} key={image.id}>
            <ImageCard openModal={openModal} images={image} />
          </li>
        );
      })}
    </ul>
  );
}

// const ImageGallery = forwardRef((props, ref) => {
//   const { data, onOpenModal } = props;
//   return (
//     <ul ref={ref} className={css.gallery}>
//       {data.map((image) => {
//         return (
//           <li onClick={onOpenModal} className={css.item} key={image.id}>
//             <ImageCard images={image} />
//           </li>
//         );
//       })}
//     </ul>
//   );
// });

// export default ImageGallery;
