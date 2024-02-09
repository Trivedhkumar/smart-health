import { Image } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// If you want to use your own Selectors look up the Advancaed Story book examples
const ImageSlider = ({ slides }) => {
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
