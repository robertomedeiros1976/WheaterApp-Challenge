import { CurrentWheaterData } from "@/types";
import '../styles/global.scss';

type CurrentWheaterProps = {
    data: CurrentWheaterData,
    city: string,
}

const CurrentWheater = ({ data, city }: CurrentWheaterProps) => (
    <div className="row mb-4 py-2">
        <div className="col-3 py-2 text-center d-flex flex-column justify-content-start align-items-center" style={{ backgroundColor: '#575786', opacity: '65%'}}>
            <p className="mb-0"><i className="bi bi-geo-alt-fill me-2"></i>{city}</p>
            <h2 className="display-4 fw-bold">MAY 5</h2>
            <p className="lead">12:37</p>
            <h3 className="mt-3">{data.weather[0].main}</h3>
        </div>
        <div className="col-6">
            <i className="owi owi-01d"></i>
        </div>
        <div className="col-3 py-2 text-center d-flex flex-column justify-content-end align-items-center" style={{ backgroundColor: '#575786', opacity: '65%'}}>
            <h6 className="display-12 fw-bold">Pressure: {data.main.pressure}</h6>
            <h6 className="display-12 fw-bold">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</h6>
            <h6 className="display-12 fw-bold">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</h6>
            <h1 className="display-1 fw-bold">{Math.round(data.main.temp)}°C</h1>
        </div>
    </div>
)

export default CurrentWheater;