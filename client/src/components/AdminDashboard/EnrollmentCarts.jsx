import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Mon', enrollments: 4, revenue: 400 },
  { name: 'Tue', enrollments: 3, revenue: 300 },
  { name: 'Wed', enrollments: 7, revenue: 700 },
  { name: 'Thu', enrollments: 5, revenue: 500 },
  { name: 'Fri', enrollments: 8, revenue: 800 },
  { name: 'Sat', enrollments: 12, revenue: 1200 },
  { name: 'Sun', enrollments: 9, revenue: 900 },
];

const EnrollmentChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Last 7 Days Activity</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#0069AA" />
            <YAxis yAxisId="right" orientation="right" stroke="#E32726" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="enrollments" name="New Enrollments" fill="#0069AA" />
            <Bar yAxisId="right" dataKey="revenue" name="Revenue (Kes)" fill="#E32726" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnrollmentChart;
