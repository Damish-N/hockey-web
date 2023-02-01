import React, { useState } from "react";
import style from "./Carousel.module.css";
import { images } from "../../../helpers/CarouselData";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Carousel() {
  const [currImg, setCurrImg] = useState(0);

  return (
    <div className={style.carousel}>
      <div
        className={style.carouselInner}
        style={{ backgroundImage: `url(${images[currImg].img})` }}
      >
        <div
          className={style.left}
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        >
          <ArrowBackIosIcon style={{ fontSize: 30 }} />
        </div>
        <div className={style.center}>
          <h1>{images[currImg].title}</h1>
          <p>{images[currImg].subtitle}</p>
        </div>
        <div
          className={style.right}
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
        >
          <ArrowForwardIosIcon style={{ fontSize: 30 }} />
        </div>
      </div>
    </div>
  );
}

export default Carousel;