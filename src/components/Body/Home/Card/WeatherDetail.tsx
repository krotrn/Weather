import Icon from './Icon';

function WeatherDetail({ icon, label, value, subValue }: { icon: string; label: string; value: string; subValue?: string }) {
    return (
        <div className="flex items-center gap-2">
            <Icon src={icon} className="h-10" />
            <div>
                <div className="font-medium">{label}</div>
                <div>{value}</div>
                {subValue && <div>{subValue}</div>}
            </div>
        </div>
    );
}

export default WeatherDetail