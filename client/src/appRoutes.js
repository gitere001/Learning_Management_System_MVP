import { lazy } from "react"

import LandingPage from "./pages/LandingPage"


const NotFound = lazy(()=> import('./pages/NotFound'))
const Signup = lazy(() => import('./pages/SignupPage'))



export const appRoutes = [
	{path:"/", element: LandingPage },
	{path:"/signup", element: Signup},
	{path: "*", element: NotFound},


]