import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import RoleSelection from "../components/Login-components/RoleSelection";
import LoginForm from "../components/Login-components/LoginForm";

const MultiStepLogin = () => {
  const location = useLocation();
  const loginRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const section = location.pathname.split("/")[1];
    if (section === "login" && loginRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
console.log(selectedRole);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="bg-white rounded-2xl shadow-xl mt-4 p-8 w-full max-w-md">
        {selectedRole === null ? (
          <RoleSelection
            onSelectRole={setSelectedRole}
            loginRef={loginRef}
          />
        ) : (
          <LoginForm
            role={selectedRole}
            onBack={() => setSelectedRole(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepLogin;