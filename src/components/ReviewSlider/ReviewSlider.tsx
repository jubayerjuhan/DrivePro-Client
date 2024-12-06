import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

// import "swiper/css";
// swiper bundle styles
import "swiper/css/bundle";

// swiper core styles
import "swiper/css";

// modules styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewSlide from "../ReviewSlide/ReviewSlide";
import "./ReviewSlider.scss";
import Button from "../core/Button/Button";

const ReviewSlider = () => {
  let sliderPerView = 3;

  console.log(window.innerWidth);
  if (window.innerWidth <= 768) sliderPerView = 2;
  if (window.innerWidth <= 600) sliderPerView = 1;

  return (
    <section className="sectionPadding review__slider">
      <p className="title">What our learners say</p>
      <p className="description">Choose a driving instructor you can trust</p>
      <Swiper
        className="slider__main"
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={sliderPerView}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <ReviewSlide
            message="Nunc quam arcu, pretium quis quam sed aoreet efficitur liuam volutpat.
        lobortis sem consequat consequat impe nulla viverraut loremut tetur diam
        nunc bibendum impea Lorem ipsum dolor sit amet, consec isicing elit."
          />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide
            message="Nunc quam arcu, pretium quis quam sed aoreet efficitur liuam volutpat.
        lobortis sem consequat consequat impe nulla viverraut loremut tetur diam
        nunc bibendum impea Lorem ipsum dolor sit amet, consec isicing elit."
          />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide message="Nunc quam arcu, pretium quis quam sed aoreet efficitur liuam volutpat." />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide message="Nunc quam arcu, pretium quis quam sed aoreet efficitur liuam volutpat." />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide message="Nunc quam arcu, pretium quis quam sed aoreet efficitur liuam volutpat." />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewSlide message="Nunc quam arcu, pretium quis quam sed aoreet efficitur liuam volutpat." />
        </SwiperSlide>
      </Swiper>
      <div className="review__slider-bookbutton">
        <Button width="30vw" title="Book Now" className="bookbutton"></Button>
      </div>
    </section>
  );
};

export default ReviewSlider;
