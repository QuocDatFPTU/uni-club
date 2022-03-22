import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClubList from "../src/pages/club/club-demo/club-list.container";
import "./App.less";
import DashboardLayout from "./layouts/dashboard/dashboard.layout";
import DashboardSider from "./layouts/dashboard/dashboard.sider";
import ClubSider from "./layouts/club/club.sider";
import HomeLayout from "./layouts/home";
import Welcome from "./pages/dashboard/welcome";
import Login from "./pages/home/login";
import { store } from "./redux/store";
import EventList from "./pages/club/event/event-list.container";
import EventCreate from "./pages/club/event/event-list.create";
import EventEdit from "./pages/club/event/event-list.edit";
import DepaList from "./pages/dashboard/department/department-list.container";
import StudentList from "./pages/dashboard/student/student-list.container";
import MemberList from "./pages/club/member/member.container";
import UniList from "./pages/admin/university-list.container";
import AdminLayout from "./layouts/admin/admin.layout";
import AdminSider from "./layouts/admin/admin.sider";
import UniEdit from "./pages/admin/university.edit";

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
				// login
				<Route path="" element={<HomeLayout />}>
					<Route path="" element={<Login />} />
					<Route path="/login" element={<Login />} />
				</Route>
				// system admin
				<Route
					path="admin"
					element={<AdminLayout sider={<AdminSider />} title="Admin" />}
				>
					<Route path="" element={<Welcome />} />
					<Route path="university" element={<UniList />} />
					<Route path="edit-university/:id" element={<UniEdit />} />
				</Route>
				// uni admin
				<Route
					path="dashboard"
					element={
						<DashboardLayout
							sider={<DashboardSider />}
							title="FPT University"
						/>
					}
				>
					<Route path="" element={<Welcome />} />
					<Route path="clubs" element={<ClubList />} />
					<Route path="departments" element={<DepaList />} />
					<Route path="students" element={<StudentList />} />
				</Route>
				// club admin
				<Route
					path="club"
					element={
						<DashboardLayout sider={<ClubSider />} title="FPT ABC CLUB" />
					}
				>
					<Route path="" element={<Welcome />} />
					<Route path="member" element={<MemberList />} />
					<Route path="event" element={<EventList />} />
					<Route path="create-event" element={<EventCreate />} />
					<Route path="edit-event/:id" element={<EventEdit />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppWrapper;
