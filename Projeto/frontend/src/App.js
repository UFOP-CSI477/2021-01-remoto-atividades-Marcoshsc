import { BrowserRouter } from "react-router-dom";
import "./styles/globals.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import Router from './components/Router'
import './interceptor/authInterceptors'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
