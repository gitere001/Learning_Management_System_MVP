import { lazy } from "react"

import LandingPage from "./pages/LandingPage"


const NotFound = lazy(() => import('./pages/NotFound'))
const Signup = lazy(() => import('./pages/SignupPage'))
const Login = lazy(() => import('./pages/LoginPage'))


export const appRoutes = [
	{ path: "/", element: LandingPage },
	{ path: "/signup", element: Signup },
	{ path: "/login", element: Login},
	{ path: "/About", element: LandingPage },
	{ path: "/featured-courses", element: LandingPage },
	{ path: "/contact-us", element: LandingPage },
	{ path: "*", element: NotFound },


]