import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import AppHeader from "./components/AppHeader";
import AppContainer from "./components/AppContainer";
import "./styles/globals.scss";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="applicationContainer">
          <AppHeader />
          <AppContainer>
            <Routes>
              <Route path="/principal" element={<MainPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </AppContainer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
