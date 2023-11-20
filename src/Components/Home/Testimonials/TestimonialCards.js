import React from "react";

function TestimonialCards({ description, name, position }) {
  return (
    <div className="shadow-md w-[395px] h-[319px] flex flex-col justify-between pl-[20px] pt-[22px] pb-[24px] rounded-[13px] hover:shadow-2xl">
      <div className="text-9xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      <div>
        <p className="font-[600] text-[20px] w-[325px] h-fit leading-[22px] text-[#000000]">
          {description}
        </p>
      </div>
      <div>
        <p>{name}</p>
        <p>{position}</p>
      </div>
    </div>
  );
}

export default TestimonialCards;
