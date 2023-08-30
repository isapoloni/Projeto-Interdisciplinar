import Carousel from "react-bootstrap/Carousel";
import Imag1 from "../../assets/Img1.jpg";
import Imag2 from "../../assets/Img2.jpeg";
import Imag3 from "../../assets/Img3.jpeg";

const listImg = [
  { name: "Img1", url: Imag1 },
  { name: "Img2", url: Imag2 },
  { name: "Img3", url: Imag3 },
];

function CarouselComponent() {
  return (
    <Carousel>
      {listImg.map(({ name, url }) => {
        return (
          <Carousel.Item key={name}>
            <img
              className="d-block w-100"
              height="600px"
              src={url}
              alt={name}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselComponent;
