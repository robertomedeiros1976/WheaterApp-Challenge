'use client'

import { ForecastDayCard } from "@/types"

type DayForecastProps = {
    data: ForecastDayCard,    
}

const DayForecast = ({ data }: DayForecastProps) => (
    <div className="col-2 p-2"> 
        <div className="card bg-dark text-white border-0 shadow-sm text-center p-3" style={{ opacity: '60%'}}>
            <p className="mb-1 fw-bold">{data.day}</p>
            <i className={`owi owi-${data.icon}`}></i> 
            <p className="fs-5 mb-0">{data.tempMax}°C</p>
            <p className="fs-5 mb-0">{data.tempMin}°C</p>            
        </div>
    </div>
)

export default DayForecast;