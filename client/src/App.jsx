import { Suspense, useEffect } from "react";
import { appRoutes } from "./appRoutes";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./features/auth/authorizationSlice";

function App() {
  const { isAuthenticated } = useSelector((state) => state.authenication);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!loading) {
  //     if (isAuthenticated) {
  //       navigate(role === 'admin' ? '/home-admin' : '/home');
  //     }
  //   }
  // }, [isAuthenticated, loading, role, navigate]);

  return (
    <div>
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              <span className="text-gray-700 text-lg">Loading...</span>
            </div>
          </div>
        }
      >
       <Routes>
          {appRoutes.map((route) => {
            if ("requireAuth" in route) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    isAuthenticated ? (
                      <route.element />
                    ) : (
                      <Navigate replace to="/login" />
                    )
                  }
                />
              );
            } else {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.element />}
                />
              );
            }
          })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
