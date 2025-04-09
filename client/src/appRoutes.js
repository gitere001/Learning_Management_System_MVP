import { lazy } from "react"

import LandingPage from "./pages/LandingPage"



const NotFound = lazy(() => import('./pages/NotFound'))
const Signup = lazy(() => import('./pages/SignupPage'))
const Login = lazy(() => import('./pages/LoginPage'))
const Home = lazy(() => import('./pages/Home'))
const HomeAdmin = lazy(() => import("./pages/HomeAdmin"))
const Checkout = lazy(()=> import("./pages/Checkout"))
const MyCourses = lazy(()=> import("./pages/studentEnrolledCourses"))
const CourseLearingDetails = lazy(()=> import("./components/studentDashboard/CourseLearningDetails"))
const ProfilesCard = lazy(()=> import("./pages/Profiles"))




export const appRoutes = [
	{ path: "/", element: LandingPage, },
	{ path: "/signup", element: Signup },
	{ path: "/login", element: Login },
	{ path: "/About", element: LandingPage },
	{ path: "/featured-courses", element: LandingPage },
	{ path: "/contact-us", element: LandingPage },
	{ path: "/home", element: Home, requireAuth:true  },
	{ path: "/home/checkout/:courseId", element: Checkout, requireAuth:true},
	{ path: "/home/my-courses", element: MyCourses, requireAuth: true},
	{ path: "/home/my-courses/:courseId", element: CourseLearingDetails, requireAuth: true},
	{ path: "/home/profiles", element: ProfilesCard, requireAuth: true},


	{ path: "/admin-dashboard", element: HomeAdmin, requireAuth:true  },
	{ path: "/admin-dashboard/add-new-course", element: HomeAdmin, requireAuth:true  },
	{ path: "/admin-dashboard/courses/update-course/:courseId", element: HomeAdmin, requireAuth:true  },
	{ path: "/admin-dashboard/courses", element: HomeAdmin, requireAuth:true  },
	{ path: "/admin-dashboard/courses/:courseId", element: HomeAdmin, requireAuth:true  },
	{ path: "/admin-dashboard/courses/:courseId/add-lesson", element: HomeAdmin, requireAuth:true},
	{ path: "/admin-dashboard/certificates", element: HomeAdmin, requireAuth:true},
	{ path: "/admin-dashboard/add-admin", element: HomeAdmin, requireAuth:true},

	{ path: "*", element: NotFound },


]