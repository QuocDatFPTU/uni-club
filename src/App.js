import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClubList from "../src/pages/club/club-demo/club-list.container";
import "./App.less";
import DashboardLayout from "./layouts/dashboard/dashboard.layout";
import HomeLayout from "./layouts/home";
import Welcome from "./pages/dashboard/welcome";
import Login from "./pages/home/login";
import { store } from "./redux/store";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
const App = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeLayout />}>
          <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {user !== null ? (
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Welcome />} />
            <Route path="clubs" element={<ClubList />} />
          </Route>
        ) : (
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Welcome />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppWrapper;
