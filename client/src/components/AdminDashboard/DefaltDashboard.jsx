import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";
import StatCard from "./StatsCard";
import EnrollmentChart from "./EnrollmentCarts";
const apiUrl = import.meta.env.VITE_API_URL;

import { BookOpen, Users, CreditCard, FileText } from "lucide-react";
import axios from "axios";

function DefaultDashboard() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    subscribedCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/auth/stats`, {
          withCredentials: true,
        });
        const { totalCourses, totalStudents, subscribedCourses } = response.data.stats;
        console.log(response.data);
        setStats({
          totalCourses,
          totalStudents,
          subscribedCourses,
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // if (loading) return <div>Loading statistics...</div>;
  // if (error) return <div>Error loading statistics: {error}</div>;

  return (
    <>
      <Greeting />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Courses"
          value={stats.totalCourses}
          icon={<BookOpen size={20} />}
          iconBgColor="#0069AA"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={<Users size={20} />}
          iconBgColor="#4CAF50"
        />
        <StatCard
          title="Subscribed Courses"
          value={stats.subscribedCourses}
          icon={<CreditCard size={20} />}
          iconBgColor="#FF9800"
        />
        <StatCard
          title="Certificates Generated"
          value={10}
          icon={<FileText size={20} />}
          iconBgColor="#E32726"
        />
      </div>

      <EnrollmentChart />
    </>
  );
}

export default DefaultDashboard;