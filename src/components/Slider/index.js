import { useState, useEffect } from "react";
import "./style.css";

let sliderImage = [
  {
    id: 1,
    name: "IMAGE_1",
    pic: "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
  },
  {
    id: 2,
    name: "IMAGE_2",
    pic: "https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png",
  },
  {
    id: 3,
    name: "IMAGE_3",
    pic: "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg",
  },
];

const Slider = () => {
  const [imageSlider] = useState(sliderImage);
  const [showImage, setShowImage] = useState(1);

  const nextImage = () => {
    if (imageSlider.length === showImage) {
      setShowImage(1);
      return;
    }
    setShowImage((prevImage) => prevImage + 1);
  };

  const previousImage = () => {
    if (showImage === 1) {
      setShowImage(imageSlider.length - 1);
      return;
    }
    setShowImage((prevImage) => prevImage - 1);
  };

  //   useEffect(() => {
  //     let interval;
  //     interval = setInterval(() => {
  //       nextImage();
  //     }, 2000);
  //     return () => clearInterval(interval);
  //   }, [showImage]);

  return (
    <>
      <h1 className="header">SLIDER</h1>
      <div className="main-container">
        <div className="image-container">
          {imageSlider.map((item) => {
            return (
              <div
                className="image-item"
                key={item.id}
                style={{
                  display: showImage === item.id ? "block" : "none",
                }}
              >
                <img src={item.pic} alt={item.name} />
              </div>
            );
          })}
          <div className="btn">
            <div>
              <button onClick={previousImage}>PREVIOUS</button>
            </div>
            <div>
              <button onClick={nextImage}>NEXT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
