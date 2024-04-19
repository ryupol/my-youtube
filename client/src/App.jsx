import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Channel from "./pages/Channel/Channel";
import SignIn from "./pages/SignIn/SignIn";
import Upload from "./pages/Upload/Upload";
import Register from "./pages/Register/Register";
import Result from "./pages/Result/Result";
import Customize from "./pages/Customize/Customize";
import Watch from "./pages/Watch/Watch";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/feed/subscriptions" element={<Home />} />
          <Route path="/feed/likes" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/result" element={<Result />} />
          <Route path="/watch" element={<Watch />} />
          <Route path="/channel/:username" element={<Channel />} />
          <Route path="/:username" element={<Channel />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
