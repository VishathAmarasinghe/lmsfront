import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateRandomColor } from '../../Utils/RandomColorGenerator';

const RegistrationPaymentLineChart = ({ chartData }) => {
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis label="Daily Amount" />
        <Tooltip />
        <Legend />
        <Line
          key={`line-1`}
          data={chartData}
          dataKey="dailyAmount"
          name={`Month 1`}
          stroke="#0088FE"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default RegistrationPaymentLineChart;
