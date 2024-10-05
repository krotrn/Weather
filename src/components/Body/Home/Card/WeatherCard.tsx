import Container from '../../../Container/Container';
import Icon from './Icon';
import { format, parse } from 'date-fns';
import { DataInterface } from '../../../../types/DataInterface';
import { useWeather } from '../../../../context/WeatherConf';
import Location from '../../../../assets/icons/Location.svg';
import Wind from '../../../../assets/icons/Wind.svg';
import Humidity from '../../../../assets/icons/Humidity.svg';
import AirQuality from '../../../../assets/icons/AirQuality.svg';
import Temperature from '../../../../assets/icons/Temperature.svg';
import Visibility from '../../../../assets/icons/Visibility.svg';
import Pressure from '../../../../assets/icons/Pressure.svg';
import UV from '../../../../assets/icons/UV.svg';
import Precipitation from '../../../../assets/icons/Precipitation.svg';
import WeatherDetail from './WeatherDetail';
import { memo } from 'react';

function WeatherCard({ className }: { className?: string }) {
    const { data }: { data: DataInterface } = useWeather();

    let formattedDate = "--";
    const dateString = data?.location?.localtime;
    if (dateString) {
        try {
            const parsedDate = parse(dateString, "yyyy-MM-dd HH:mm", new Date());
            formattedDate = format(parsedDate, 'MMMM dd, yyyy HH:mm');
        } catch (error) {
            console.error("Error parsing date:", error);
            
        }
    }

    const airQuality = data?.current?.air_quality;
    const airQualityIndex = airQuality ? airQuality["us-epa-index"] : "--";

    return (
        <Container className={`w-full my-24 lg:my-0 max-w-4xl grid gap-6 p-5 h-fit bg-white rounded-xl bg-opacity-60 shadow-[rgba(0,0,0,0.35)_0px_5px_15px] backdrop-blur-lg ${className}`}>
            {/* Location and Date */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-start gap-2">
                    <Icon src={Location} className="h-10" />
                    <div>
                        <h3 className="text-xl font-semibold">
                            {`${data?.location?.name ?? "--"}, ${data?.location?.country ?? "--"}`}
                        </h3>
                        <h4 className="text-sm font-semibold">{`${data?.location?.region ?? "--"}`}</h4>
                        <p className="text-xs">{formattedDate}</p>
                    </div>
                </div>
                {/* Temperature and Weather Condition */}
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <Icon src={Temperature} className="h-16 md:h-20" />
                    <div className="text-6xl md:text-8xl font-bold">{`${data?.current?.temp_c ?? "--"}°C`}</div>
                    <div className="hidden md:block text-3xl">{`${data?.current?.temp_f ?? "--"}°F`}</div>
                    <div className="grid gap-2 text-center">
                        <Icon src={data?.current?.condition?.icon ?? ""} alt='Condition' className="h-16 md:h-20" />
                        <div className="text-sm font-semibold">{`${data?.current?.condition?.text ?? "--"}`}</div>
                    </div>
                </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    {/* Humidity */}
                    <WeatherDetail icon={Humidity} label="Humidity" value={`${data?.current?.humidity ?? "--"}%`} />

                    {/* Wind */}
                    <WeatherDetail icon={Wind} label="Wind" value={`${data?.current?.wind_mph ?? "--"} mph`} subValue={`${data?.current?.wind_kph ?? "--"} kph`} />
                </div>

                <div className="grid gap-4">
                    {/* Pressure */}
                    <WeatherDetail icon={Pressure} label="Pressure" value={`${data?.current?.pressure_mb ?? "--"} mb`} subValue={`${data?.current?.pressure_in ?? "--"} in`} />

                    {/* Precipitation */}
                    <WeatherDetail icon={Precipitation} label="Precipitation" value={`${data?.current?.precip_mm ?? "--"} mm`} subValue={`${data?.current?.precip_in ?? "--"} in`} />
                </div>

                <div className="grid gap-4">
                    {/* Cloud Coverage */}
                    <WeatherDetail icon={Humidity} label="Cloud Coverage" value={`${data?.current?.cloud ?? "--"}%`} />

                    {/* UV Index */}
                    <WeatherDetail icon={UV} label="UV Index" value={`${data?.current?.uv ?? "--"}`} />
                </div>

                <div className="grid gap-4">
                    {/* Air Quality */}
                    <WeatherDetail icon={AirQuality} label="Air Quality" value={`US-EPA Index: ${airQualityIndex}`} subValue={`CO: ${airQuality?.co?.toFixed(2) ?? "--"} µg/m³`} />

                    {/* Visibility */}
                    <WeatherDetail icon={Visibility} label="Visibility" value={`${data?.current?.vis_km ?? "--"} km`} subValue={`${data?.current?.vis_miles ?? "--"} miles`} />
                </div>

                {/* Feels Like */}
                <WeatherDetail icon={Temperature} label="Feels Like" value={`${data?.current?.feelslike_c ?? "--"}°C`} subValue={`${data?.current?.feelslike_f ?? "--"}°F`} />
            </div>
        </Container>
    );
}

export default memo(WeatherCard);