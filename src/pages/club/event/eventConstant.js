import React from "react";
import Text from "antd/lib/typography/Text";
import moment from "moment";

export const eventColumns = [
	{
		title: "Event",
		dataIndex: "event-name"
	},
	{
		title: "Start date",
		dataIndex: "start-date",
		render: (startDate) => {
			let time = moment(startDate, "YYYY-MM-DD");
			return time.format("DD-MM-YYYY");
		}
	},
	{
		title: "End date",
		dataIndex: "end-date",
		render: (endDate) => {
			let time = moment(endDate, "YYYY-MM-DD");
			return time.format("DD-MM-YYYY");
		}
	},
	{
		title: "Location",
		dataIndex: "location"
	},
	{
		title: "Action",
		dataIndex: "id",
		render: (id) => {
			return (
				<Text style={{ cursor: "pointer" }} type="warning">
					View
				</Text>
			);
		}
	}
];

export const eventRoutes = [
	{
		path: "index",
		breadcrumbName: "Club"
	},
	{
		path: "first",
		breadcrumbName: "Event"
	}
];
