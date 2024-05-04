import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateRandomColor } from '../../Utils/RandomColorGenerator';

const AttendanceBarchart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
        <XAxis dataKey="day" />
        <YAxis label="Count" />
        <Tooltip />
        <Legend />
        <Bar dataKey="maleCount" name="Male" fill="#8884d8" />
        <Bar dataKey="femaleCount" name="Female" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AttendanceBarchart;
