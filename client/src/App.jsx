
import { appRoutes } from "./appRoutes";
import {Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);  // Fake logged-in state
  const [username, setUsername] = useState("JohnDoe");  // Fake username
  const [email, setEmail] = useState("johndoe@example.com");  // Fake email
  const [image, setImage] = useState("https://via.placeholder.com/150");  // Fake profile image

  return (
    <div>
      <Routes>
        {appRoutes.map((route) => {
          if ("requireAuth" in route) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  isLoggedIn ? (
                    <route.element
                      username={username}
                      email={email}
                      image={image}
                    />
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
                element={<route.element setEmail={setEmail} />}
              />
            );
          }
        })}
      </Routes>
    </div>
  );
}

export default App;
