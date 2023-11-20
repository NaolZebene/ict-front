import React, { useState, useEffect } from "react";
import TestimonialCards from "./TestimonialCards";

function Testimonials() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const addreport = async () => {
      const response = await fetch("http://localhost:8080/testimonial");

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
    <div className="mt-[83px] flex flex-col mb-[100px]">
      <div>
        <p className="font-[300] text-[36px] leading-[22px] underline mb-[16px] text-center text-[#00000094]">
          Testimonials
        </p>
        <p className="font-[300] text-[40px] text-[#4879F5] text-center">
          Client Feedback
        </p>
        <p className="font-[300] text-[20px] text-[#4879F5] text-center mb-[56px]">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          consequuntur magni dolores.
        </p>
      </div>

      <div className="grid grid-cols-3 pl-[100px]">
        {isLoading && <h1>Loading</h1>}

        {!isLoading &&
          data.msg.map((d) => (
            <TestimonialCards
              key={d._id}
              description={d.description}
              name={d.author}
              position={d.company}
            />
          ))}
      </div>
    </div>
  );
}

export default Testimonials;
