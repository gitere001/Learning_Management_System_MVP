import { Provider, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import store from "./app/store";
import Footer from "./components/Footer";

const RootComponent = () => {
  const { isAuthenticated, role } = useSelector((state) => state.authenication);

  // Check if the user is authenticated and is an admin
  const isAdmin = isAuthenticated && role === 'admin';

  return (
    <>
      {!isAdmin && <Navbar />}
      <App />
     {!isAdmin && <Footer />}
    </>
  );
};

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootComponent />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;