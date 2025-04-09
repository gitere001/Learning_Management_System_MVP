import React, { useEffect, useState } from "react";
import DefaltDashboard from "./DefaltDashboard";
import AddCourseModal from "./AddCourseDialog";
import { useLocation } from "react-router-dom";
import UpdateCourseModal from "./UpdateCourse";
import AdminCourses from "./AdminCourses";
import AddLesson from "../Lessons/AddLessons";
import { useParams } from "react-router-dom";
import LessonForm from "../Lessons/LessonForm";
import AdminCertificationsModal from "./Certificate";
import AddAdminForm from "../underDevelopment/AddAdmin";


const Dashboard = () => {
  const {courseId} = useParams()

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("default");


  useEffect(() => {
    if (location.pathname === "/admin-dashboard") {
      setCurrentPath("default");
    } else if (location.pathname.includes("add-new-course")) {
      setCurrentPath("addNewCourse");
    } else if (location.pathname.includes("update-course")) {
      setCurrentPath("updateCourse");
    } else if (location.pathname === "/admin-dashboard/courses") {
      setCurrentPath("adminCourses")
    } else if (location.pathname === `/admin-dashboard/courses/${courseId}`) {
      setCurrentPath("addLessons")
    } else if (location.pathname === `/admin-dashboard/courses/${courseId}/add-lesson`) {
      setCurrentPath("addNewLesson")
    } else if (location.pathname === "/admin-dashboard/certificates") {
      setCurrentPath("adminCerficates")
    } else if (location.pathname === "/admin-dashboard/add-admin") {
      setCurrentPath("addAdmin")
    } else {
      setCurrentPath("default"); // fallback
    }
  }, [location.pathname]);


  return (
    <div className="p-8">
      {currentPath === "default" && <DefaltDashboard />}
      {currentPath === "addNewCourse" && <AddCourseModal />}
      {currentPath === "updateCourse" && (
        <UpdateCourseModal  />
      )}
      {currentPath === "adminCourses" && <AdminCourses/>}
      {currentPath === "addLessons" && <AddLesson/>}
      {currentPath === "addNewLesson" && <LessonForm/>}
      {currentPath === "adminCerficates" && <AdminCertificationsModal/>}
      {currentPath === "addAdmin" && <AddAdminForm/>}
    </div>
  );
};

export default Dashboard;
