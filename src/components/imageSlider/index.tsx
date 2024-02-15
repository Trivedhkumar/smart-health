import { Image } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SLIDE_DATA_TYPE } from "../../constants/types";
interface Props {
  slides: SLIDE_DATA_TYPE;
}
// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }: Props) => {
  return (
    <Carousel infiniteLoop autoPlay showThumbs={false}>
      {slides.map((slide) => {
        return (
          <Image
            key={slide.image}
            fit={"cover"}
            src={slide.image}
            height="500px"
            width="100%"
          />
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
