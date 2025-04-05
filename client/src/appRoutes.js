import { lazy } from "react"

import LandingPage from "./pages/LandingPage"


const NotFound = lazy(()=> import('./pages/NotFound'))
const Signup = lazy(() => import('./pages/SignupPage'))
// const About = lazy(()=> import('./components/About'))
// const FeaturedCourses = lazy(()=> import('./components/FeaturedCourse'))
// const Contact = lazy(()=> import('./components/ContactForm'))



export const appRoutes = [
	{path:"/", element: LandingPage },
	{path:"/signup", element: Signup},
	{path: "/About", element: LandingPage},
	{path: "/featured-courses", element: LandingPage},
	{path: "/contact-us", element: LandingPage},
	{path: "*", element: NotFound},


]