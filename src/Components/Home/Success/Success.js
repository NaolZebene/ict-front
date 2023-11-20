import OneSucc from "./OneSucc"
import { useState } from "react"

function Success() {
    const [data, setData] = useState({
        payload: [
            {
                id: 1,
                numbers: "100",
                title: "GLOBAL BRANDS"
            },
            {
                id: 2,
                numbers: "1600+",
                title: "HAPPY CLIENTS"
            },
            {
                id: 3,
                numbers: "100+",
                title: "SUCCESSFUL SERVICES"
            },
            {
                id: 4,
                numbers: "600+",
                title: "TOTAL EMPLOYEES"
            }
        ]
    })
    return (
        <div className="bg-[#d9d9d92e] mt-[93px] h-[198px] grid grid-cols-4 items-center pl-[86px]">
            {
                data.payload.map((d) => (
                    <OneSucc key={d.id} numbers={d.numbers} title={d.title} />
                ))
            }
        </div>
    )
}

export default Success