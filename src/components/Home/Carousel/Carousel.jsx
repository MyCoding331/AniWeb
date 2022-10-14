import React from "react";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { BsFillPlayFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import "./Carousel.scss"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Carousel({ images }) {
  const { width } = useWindowDimensions();

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={width <= 800 ? false : true}
        pagination={{ dynamicBullets: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {images.map(
          (item, el) =>
            item.bannerImage !== null && (
              <>
                <SwiperSlide key={el}>
                  <div className="Container">
                    {width <= 800 && (
                      <img
                      src={item.bannerImage}
                        alt={item.title.english}
                       
                        style={bannerImageStyleMobile}
                      />
                    )}
                    {width > 800 && (
                      <img
                      src={item.bannerImage}
                        alt={item.title.english}
                        
                        style={bannerImgStyle} // use normal <img> attributes as props
                      />
                    )}
                    <div className="Wrapper">
                      <div className="Content">
                        {width <= 800 && (
                          <p>
                            {item.title.english !== null
                              ? item.title.english.length > 35
                                ? item.title.english.substring(0, 35) + "..."
                                : item.title.english
                              : item.title.romaji.length > 35
                              ? item.title.romaji.substring(0, 35) + "..."
                              : item.title.romaji}
                          </p>
                        )}
                        {width > 800 && (
                          <p>
                            {item.title.english !== null
                              ? item.title.english
                              : item.title.romaji}
                          </p>
                        )}

                        {width <= 800 && (
                          <IconContext.Provider
                            value={{
                              size: "2rem",
                              style: {
                                verticalAlign: "middle",
                                paddingLeft: "0.2rem",
                              },
                            }}
                          >
                            <Link className="Button" to={"search/" + item.title.romaji}>
                              <BsFillPlayFill />
                            </Link>
                          </IconContext.Provider>
                        )}
                        {width > 800 && (
                          <IconContext.Provider
                            value={{
                              size: "1.15rem",
                              style: {
                                verticalAlign: "middle",
                                marginBottom: "0.1rem",
                                marginRight: "0.3rem",
                              },
                            }}
                          >
                            <Link className="Button" to={"search/" + item.title.romaji}>
                              <BsFillPlayFill />
                              Watch Now
                            </Link>
                          </IconContext.Provider>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            )
        )}
      </Swiper>
    </div>
  );
}

const bannerImgStyle = {
  width: "100%",
  height: "330px",
  objectFit: "cover",
  borderRadius: "0.7rem",
};

const bannerImageStyleMobile = {
  width: "100%",
  height: "230px",
  objectFit: "cover",
  borderRadius: "0.5rem",
};


export default (Carousel) ;
