import React, { useEffect, useState } from "react";
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
import UniList from "./pages/admin/university/university-list.container";
import AdminLayout from "./layouts/admin/admin.layout";
import AdminSider from "./layouts/admin/admin.sider";
import UniEdit from "./pages/admin/university/university.edit";
import UniCreate from "./pages/admin/university/university.create";
import AccountList from "./pages/admin/account/account-list.container";
import UniAccountCreate from "./pages/admin/account/account.create";
import UniAccountEdit from "./pages/admin/account/account.edit";
import ClubAccountCreate from "./pages/dashboard/account/account.create";
import PostList from "./pages/club/post/post-list.container";
import TaskList from "./pages/club/task/task-list.container";
import PostCreate from "./pages/club/post/post-list.create";
import PostEdit from "./pages/club/post/post-list.edit";
import PostTask from "./pages/club/task/task-list.create";
import TaskCreate from "./pages/club/task/task-list.create";
import TaskEdit from "./pages/club/task/task-list.edit";
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
				<Route path="admin" element={<AdminLayout sider={<AdminSider />} />}>
					<Route path="" element={<Welcome />} />
					<Route path="university" element={<UniList />} />
					<Route path="edit-university/:id" element={<UniEdit />} />
					<Route path="create-university" element={<UniCreate />} />
					<Route path="account" element={<AccountList />} />

					<Route path="create-account" element={<UniAccountCreate />} />
					<Route path="edit-account/:id" element={<UniAccountEdit />} />
				</Route>
				<Route
					path="dashboard"
					element={<DashboardLayout sider={<DashboardSider />} />}
				>
					<Route path="" element={<Welcome />} />
					<Route path="clubs" element={<ClubList />} />
					<Route path="departments" element={<DepaList />} />
					<Route path="student" element={<StudentList />} />
					<Route path="create-account" element={<ClubAccountCreate />} />
				</Route>
				<Route path="club" element={<DashboardLayout sider={<ClubSider />} />}>
					<Route path="" element={<Welcome />} />
					<Route path="member" element={<MemberList />} />
					<Route path="event" element={<EventList />} />
					<Route path="post" element={<PostList />} />
					<Route path="task" element={<TaskList />} />
					<Route path="create-event" element={<EventCreate />} />
					<Route path="edit-event/:id" element={<EventEdit />} />
					<Route path="create-post" element={<PostCreate />} />
					<Route path="edit-post/:id" element={<PostEdit />} />
					<Route path="create-task" element={<TaskCreate />} />
					<Route path="edit-task/:id" element={<TaskEdit />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppWrapper;
