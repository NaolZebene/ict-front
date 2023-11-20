function Services({ img, title, description }) {
  return (
    <div className="border-2 flex flex-col w-[302px] h-[269px] items-center rounded-[45px] pt-[33px] mb-[30px] hover:border-[#4879F5] hover:shadow-2xl">
      <img
        className="w-[65px] h-[65px] mb-[25px]"
        src={"http://localhost:8080/" + img}
        alt="construction icon"
      />
      <div className="flex flex-col items-center">
        <p className="mb-[8px] text-[21px] text-[#4879F5] font-[500]">
          {title}
        </p>
        <p className="w-[202px] font-[200] leading-[22px] text-[15px] text-[#000000]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Services;
