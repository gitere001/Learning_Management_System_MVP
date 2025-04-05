import { lazy } from "react"

import LandingPage from "./pages/LandingPage"

const NotFound = lazy(()=> import('./pages/NotFound'))

// const Login = lazy(()=> import('./pages/Login'))
// const Signup = lazy(()=> import('./pages/Signup'))


// const About = lazy(()=> import('./pages/About'))
// const NotFound = lazy(() => import('./pages/NotFound'))
// const BookDetails = lazy(()=> import('./pages/BookDetails'))


export const appRoutes = [
	{path:"/", element: LandingPage },
	{path: "*", element: NotFound},
	// {path: "/signup", element:Signup},
	// {path: "/login", element:Login},
	// {path: "/about", element: About},
	// {path: "/profile", element: Profiles, requireAuth: true},
	// {path: "/dashboard", element: Home},
	// {path: "/dashboard/bookDetails/:bookTitle", element: BookDetails}
]