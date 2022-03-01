import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export const departmentColumns = [
	{
		title: "Department Name",
		dataIndex: "dep-name"
	},
	{
		title: "Short name",
		dataIndex: "short-name"
	},
	{
		title: "Action",
		render: () => {
			return (
				<Text style={{ cursor: "pointer" }} type="warning">
					Edit
				</Text>
			);
		}
	}
];

export const departmentRoutes = [
	{
		path: "index",
		breadcrumbName: "Dashboard"
	},
	{
		path: "first",
		breadcrumbName: "Department"
	}
];
