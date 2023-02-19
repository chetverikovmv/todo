import { useState } from "react";

export function AboutPage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    return (
        <div className="container mx-auto max-w-lg px-4 pt-5">
            <p className="container text-center mt-5 ">Учебное приложение ToDo list by M. Chetverikov. <br /> React, TypeScript, Tailwind CSS </p>
        </div>
    )
}
