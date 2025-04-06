import { lazy } from "react"

import LandingPage from "./pages/LandingPage"


const NotFound = lazy(() => import('./pages/NotFound'))
const Signup = lazy(() => import('./pages/SignupPage'))
const Login = lazy(() => import('./pages/LoginPage'))
const Home = lazy(() => import('./pages/Home'))
const HomeAdmin = lazy(() => import("./pages/HomeAdmin"))
const AddNewCourse = lazy(()=> import("./components/AdminDashboard/AddCourseDialog"))


export const appRoutes = [
	{ path: "/", element: LandingPage },
	{ path: "/signup", element: Signup },
	{ path: "/login", element: Login },
	{ path: "/About", element: LandingPage },
	{ path: "/featured-courses", element: LandingPage },
	{ path: "/contact-us", element: LandingPage },
	{ path: "/home", element: Home },
	{ path: "/admin-dashboard", element:HomeAdmin },
	{path: "/admin-dashboard/add-new-course", element: HomeAdmin },
	{ path: "*", element: NotFound },


]