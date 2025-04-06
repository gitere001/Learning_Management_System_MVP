import React, { useEffect, useState } from 'react';
import DefaltDashboard from './DefaltDashboard';
import AddCourseModal from './AddCourseDialog';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("default");

  useEffect(() => {
    if (location.pathname === "/admin-dashboard") {
      setCurrentPath("default");
    } else if (location.pathname.includes("add-new-course")) {
      setCurrentPath("addNewCourse");
    } else {
      setCurrentPath("default"); // fallback
    }
  }, [location.pathname]);
  console.log(location.pathname);

  return (
    <div className="p-8">
      {currentPath === "default" && <DefaltDashboard />}
      {currentPath === "addNewCourse" && <AddCourseModal />}
    </div>
  );
};

export default Dashboard;
