import React from "react";
import Slider from "react-slick";
import UserTestimony from "./usertesttimony";

export default function Carousel() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "50px",
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 3,
      speed: 500,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },],
    };

    return (
        <Slider {...settings} className="slider-bg">
            <div>
                <UserTestimony
                    userImage="https://ddgimgs-f43e.kxcdn.com/2147107/yuufvl_197c88bcf5c1e9351c1d468b06f4a7684056f467.jpg"
                    username="John Doe"
                    testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis."
                />
            </div>
            <div>
                <UserTestimony
                    userImage="https://ddgimgs-f43e.kxcdn.com/2147107/yuufvl_197c88bcf5c1e9351c1d468b06f4a7684056f467.jpg"
                    username="John Doe"
                    testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis."
                />
            </div>
            <div>
                <UserTestimony
                    userImage="https://ddgimgs-f43e.kxcdn.com/2147107/yuufvl_197c88bcf5c1e9351c1d468b06f4a7684056f467.jpg"
                    username="John Doe"
                    testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis."
                />
            </div>
            <div>
                <UserTestimony
                    userImage="https://ddgimgs-f43e.kxcdn.com/2147107/yuufvl_197c88bcf5c1e9351c1d468b06f4a7684056f467.jpg"
                    username="John Doe"
                    testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis."
                />
            </div>
            <div>
                <UserTestimony
                    userImage="https://ddgimgs-f43e.kxcdn.com/2147107/yuufvl_197c88bcf5c1e9351c1d468b06f4a7684056f467.jpg"
                    username="John Doe"
                    testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis."
                />
            </div>
            <div>
                <UserTestimony
                    userImage="https://ddgimgs-f43e.kxcdn.com/2147107/yuufvl_197c88bcf5c1e9351c1d468b06f4a7684056f467.jpg"
                    username="John Doe"
                    testimony="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod euismod magna, eget lobortis arcu luctus quis."
                />
            </div>
        </Slider>
    )
}