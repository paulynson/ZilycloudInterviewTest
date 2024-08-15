import React from "react";
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleCarousel: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const iconIds = ["icon1", "icon2", "icon3", "icon4", "icon5", "icon6"];

  return (
    <div className="lg:max-w-md max-w-[320px]  my-8 bg-white rounded-md p-3 bg-opacity-[0.01] ">
      <Slider {...settings}>
        {iconIds.map((iconId, index) => (
          <div key={index} className="flex items-center justify-center">
            <svg width="118" height="118" viewBox="0 0 118 118">
              <use href={`/sprite.svg#${iconId}`} />
            </svg>
            <span className="text-center opacity-0">.</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default React.memo(SimpleCarousel);
