import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";
import store from "./app/store";
import Footer from "./components/Footer";



// Create a wrapper component inside Provider
const RootComponent = () => {




  return (
    <>
      {/* <div className={`overlay ${openMobileMenu ? "show-overlay" : ""}`}></div> */}

       <Navbar />
      <App />
	  <Footer/>
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