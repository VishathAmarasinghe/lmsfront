import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const ClassPaymentLineChart = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Amount", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="value"
          name="Amount"
          stroke="#0088FE"
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ClassPaymentLineChart;
