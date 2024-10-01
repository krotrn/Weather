import Container from '../../../Container/Container';
import Icon from './Icon';
import { format, parse } from 'date-fns';
import { DataInterface } from '../../../Default/DefaultData';
import { useWeather } from '../../../../context/WeatherConf';
import Location from '../../../../assets/icons/Location.svg';
import Wind from '../../../../assets/icons/Wind.svg';
import Humidity from '../../../../assets/icons/Humidity.svg';
import AirQuality from '../../../../assets/icons/AirQuality.svg';
import Temperature from '../../../../assets/icons/Temperature.svg';
import Visibility from '../../../../assets/icons/Visibility.svg';

function WeatherCard({ className }: { className?: string }) {
    const { data }: { data: DataInterface } = useWeather();

    // Parse and format the date
    let formattedDate = "--";
    const dateString = data?.location?.localtime;
    if (dateString) {
        try {
            const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm', new Date());
            formattedDate = format(parsedDate, 'MMMM dd, yyyy HH:mm');
        } catch (error) {
            console.error("Error parsing date:", error);
        }
    }

    // Handling air quality data
    const airQuality = data?.current?.air_quality;
    const airQualityIndex = airQuality ? airQuality["us-epa-index"] : "--";

    return (
        <Container className={`w-fit grid gap-6 h-fit bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter shadow-[rgba(0,0,0,0.35)_0px_5px_15px] backdrop-blur-lg ${className} `}>
            {/* Location and Date */}
            <div className="flex items-center justify-between">
                <div className="flex items-start gap-2">
                    <Icon src={Location} className="h-10" />
                    <div>
                        <h3 className="text-xl font-semibold">{`${data?.location?.name ?? "--"}, ${data?.location?.country ?? "--"}`}</h3>
                        <h4 className="text-sm font-semibold">{`${data?.location?.region ?? "--"}`}</h4>
                        <p className="text-xs">{formattedDate}</p>
                    </div>
                </div>
                {/* Temperature and Weather Condition */}
                <div className="flex items-center gap-4">
                    <Icon src={Temperature} className="h-20" />
                    <div className="text-8xl font-bold">{`${data?.current?.temp_c ?? "--"}°C`}</div>
                    <div className="text-3xl">{`${data?.current?.temp_f ?? "--"}°F`}</div>
                    <div className="grid gap-2">
                        <Icon src={data?.current?.condition?.icon ?? ""} className="h-20" />
                        <div className="text-center text-sm font-semibold">{`${data?.current?.condition?.text ?? "--"}`}</div>
                    </div>
                </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
                {/* Humidity */}
                <div className="flex items-center gap-2">
                    <Icon src={Humidity} className="h-10" />
                    <div>
                        <div className="font-medium">Humidity</div>
                        <div>{data?.current?.humidity ?? "--"}%</div>
                    </div>
                </div>

                {/* Wind */}
                <div className="flex items-center gap-2">
                    <Icon src={Wind} className="h-10" />
                    <div>
                        <div className="font-medium">Wind</div>
                        <div>{data?.current?.wind_mph ?? "--"} mph</div>
                        <div>{data?.current?.wind_kph ?? "--"} kph</div>
                    </div>
                </div>

                {/* Air Quality */}
                <div className="flex items-center gap-2">
                    <Icon src={AirQuality} className="h-10" />
                    <div>
                        <div className="font-medium">Air Quality</div>
                        <div>US-EPA Index: {airQualityIndex}</div>
                        <div>CO: {airQuality?.co?.toFixed(2) ?? "--"} µg/m³</div>
                        <div>PM2.5: {airQuality?.pm2_5?.toFixed(2) ?? "--"} µg/m³</div>
                    </div>
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-2">
                    <Icon src={Visibility} className="h-10" />
                    <div>
                        <div className="font-medium">Visibility</div>
                        <div>{data?.current?.vis_km ?? "--"} km</div>
                        <div>{data?.current?.vis_miles ?? "--"} miles</div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default WeatherCard;
