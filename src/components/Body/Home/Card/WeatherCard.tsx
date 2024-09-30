import Container from '../../../Container/Container';
import Icon from './Icon';
import { useWeather } from '../../../../context/WeatherContext';
import { format, parse } from 'date-fns';

interface WeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        humidity: number;
        wind_mph: number;
    };
}

function WeatherCard({ className }: { className?: string }) {
    
    const { data }: { data: WeatherData } = useWeather();
    let formattedDate:string = ""
    const dateString = data?.location?.localtime;
    if (dateString) {
        const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm', new Date()).toString();
        if (parsedDate === 'Invalid Date') {
            formattedDate = format(parsedDate, 'MMMM dd, yyyy');
        }
        
    }

    return (
        <Container className={`w-full max-w-sm p-6 grid gap-6 h-fit border-black border rounded-md ${className} `}>
            <div className="flex items-center justify-between">
                <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <h3 className="text-xl font-semibold">{`${data?.location?.name} ${data?.location?.region} ${data?.location?.country}`}</h3>
                    </div>
                    <div className="">{formattedDate}</div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-8xl font-bold">{`${data?.current?.temp_c}°`}</div>
                    <div className="grid gap-2">
                        <Icon src={data?.current?.condition?.icon} className="w-10 h-10" />
                        <div className="">{`${data?.current?.condition?.text}`}</div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <div>
                        <div className="font-medium">Humidity</div>
                        <div className="">{data?.current?.humidity}</div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <div>
                        <div className="font-medium">Wind</div>
                        <div className="">{data?.current?.wind_mph} mph</div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default WeatherCard;