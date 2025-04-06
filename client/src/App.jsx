import { Suspense } from "react";
import { appRoutes } from "./appRoutes";
import { Route, Routes } from "react-router-dom";

function App() {
  const isLoggedIn = false;

  return (
    <div>
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Routes>
          {appRoutes.map((route) => {
            if ("requireAuth" in route) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    isLoggedIn ? (
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
