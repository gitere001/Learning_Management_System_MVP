import { useSelector } from "react-redux";
import { Edit } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const UserProfileCard = () => {
  const { user } = useSelector((state) => state.authenication);
  const fullName = `${user.firstName} ${
    user.middleName ? user.middleName + " " : ""
  }${user.lastName}`;
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/home/profiles") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location.pathname]);

  return (
    <div className="mt-[140px] mx-auto w-[94%] md:w-[100%] max-w-4xl min-h-screen ">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0069AA] to-[#00A1E0] flex items-center justify-center text-white text-3xl font-bold">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>

            {/* User Info */}
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Edit Button */}
            <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
              <Edit size={16} className="mr-2" />
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
