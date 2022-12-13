import "./chart.scss"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({ slide }) => {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={150} height={40} data={slide.options}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="counter" fill="#356dff" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default Chart;
