import { useState } from "react";

import "./carousel.css";

export const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <article className="p-1">
        <figure className="spotlight-image">
          <img src={images[current]} alt="product image" />
        </figure>

        <div className="img-small mt-2 flex justify-center flex-wrap">
          {images.map((image, index) => {
            return (
              <img
                src={image}
                className={`${current == index ? "active" : "null"} mr-1`}
                alt="product image"
                onMouseEnter={() => setCurrent(index)}
                onClick={() => setCurrent(index)}
                key={image}
              />
            );
          })}
        </div>
      </article>
    </>
  );
};
