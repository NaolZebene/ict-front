import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const GalleryPost = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const addreport = async () => {
        const response = await fetch("http://localhost:8080/home/gallary/get");
  
        if (!response.ok) {
          console.log("something is wrong");
        }
  
        const data = await response.json();
        console.log(data);
        setData(data);
        setIsLoading(false);
      };
  
      addreport();
    }, []);
    return (
        <>
        <div className="mb-[20px]">
      <div>
        <p className="text-[36px] font-[300] leading-[22px] text-center underline mb-[56px] text-[#00000094]">
          Gallery
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        spaceBetween={0}
        slidesPerView={4}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className=" h-[500px] bg-[#d9d9d92e] items-center"
      >
        {isLoading && <h1>Loading</h1>}
        {!isLoading &&
          data.msg.map((d) => (
            <SwiperSlide>
              <img
                className="w-[410px] h-[410px] rounded-[10px] mr-30 ml-10 mt-5"
                src={"http://localhost:8080/" + d.path}
                alt="Gallery"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
        </>
    )
}

export default GalleryPost