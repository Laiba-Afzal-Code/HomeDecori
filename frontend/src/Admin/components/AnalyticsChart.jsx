import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="posts"
          stroke="#4f46e5"
          strokeWidth={2}
        />
        <Line type="monotone" dataKey="users" stroke="#22c55e" />
        <Line type="monotone" dataKey="posts" stroke="#4f46e5" />
      </LineChart>
    </ResponsiveContainer>
  );
}
