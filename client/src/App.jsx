import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home/index";
import Channel from "./pages/Channel/index";
import SignIn from "./pages/SignIn/SignIn";
import Upload from "./pages/Upload/Upload";
import Register from "./pages/Register/Register";
import "./App.css";

import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/channel" element={<Channel />} />
        {/* <Route path="/result" element={<Result />} />
          <Route path="/watch" element={<Watch />} /> */}
      </Routes>
    </Provider>
  );
}

export default App;
