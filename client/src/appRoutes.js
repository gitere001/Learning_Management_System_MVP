import { lazy } from "react"

import LandingPage from "./pages/LandingPage"


const NotFound = lazy(() => import('./pages/NotFound'))
const Signup = lazy(() => import('./pages/SignupPage'))
const Login = lazy(() => import('./pages/LoginPage'))
const Home = lazy(() => import('./pages/Home'))


export const appRoutes = [
	{ path: "/", element: LandingPage },
	{ path: "/signup", element: Signup },
	{ path: "/login", element: Login },
	{ path: "/About", element: LandingPage },
	{ path: "/featured-courses", element: LandingPage },
	{ path: "/contact-us", element: LandingPage },
	{ path: "/home", element: Home },
	{ path: "*", element: NotFound },


]