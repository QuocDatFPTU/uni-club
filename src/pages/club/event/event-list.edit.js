import {
	Col,
	PageHeader,
	Row,
	Upload,
	Form,
	Input,
	DatePicker,
	Switch,
	Layout,
	Button,
	InputNumber,
	Spin,
	Select
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { success } from "../../../components/CustomSuccessModal";
import { formatDate, formatDateTimeFull } from "../../../util/constant";
import { getEventByID, updateEvent } from "./event.service";
const EventEdit = () => {
	const [event, setEvent] = useState(null);
	const { id } = useParams();
	const fetchEvent = async (id) => {
		let res = await getEventByID(id);
		console.log(res.data);
		setEvent(res.data);
	};

	useEffect(() => {
		fetchEvent(id);
	}, []);

	const onFinish = async (values) => {
		values.Id = id;
		values["EndDate"] =
			moment(values["EndDate"], formatDate).format(formatDateTimeFull) + "Z";
		values["StartDate"] =
			moment(values["StartDate"], formatDate).format(formatDateTimeFull) + "Z";
		let res = await updateEvent(values, id);
		console.log(res);
		if (res != null) {
			success("Edit success");
		}
	};

	return event == null ? (
		<Spin size="large" />
	) : (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Edit Event"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form
						initialValues={{
							Description: event.description,
							EventName: event["event-name"],
							IsPrivate: event["is-private"],
							Location: event.location,
							MaxParticipants: event["max-participants"],
							Point: event.point,
							ImageUrl: event["image-url"],
							StartDate: moment(event["start-date"]),
							EndDate: moment(event["start-date"]),
							Status: event.status
						}}
						onFinish={onFinish}
						layout="vertical"
					>
						<Row>
							<Col offset={4} span={5}>
								<Form.Item name="ImageUrl" label="Event Image">
									<Upload
										accept="image/*"
										maxCount={1}
										className="UploadImage"
										listType="picture-card"
									>
										{"+ Upload "}
									</Upload>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name="EventName"
									label="Name"
									rules={[
										{
											required: true,
											message: "Event name must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="StartDate"
									label="Start Date"
									rules={[
										{
											required: true,
											message: "Start date must be entered!"
										}
									]}
								>
									<DatePicker />
								</Form.Item>
								<Form.Item
									name="EndDate"
									label="End Date"
									rules={[
										{
											required: true,
											message: "End date must be entered!"
										}
									]}
								>
									<DatePicker />
								</Form.Item>
								<Form.Item
									name="Location"
									label="Location"
									rules={[
										{
											required: true,
											message: "Location must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="Point"
									label="Point"
									rules={[
										{
											required: true,
											message: "Point must be entered!"
										}
									]}
								>
									<InputNumber />
								</Form.Item>
								<Form.Item
									name="MaxParticipants"
									label="Max participants"
									rules={[
										{
											required: true,
											message: "Max participants must be entered!"
										}
									]}
								>
									<InputNumber />
								</Form.Item>
								<Form.Item
									name="Description"
									label="Description"
									rules={[
										{
											required: true,
											message: "Description must be entered!"
										}
									]}
								>
									<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
								</Form.Item>
								<Form.Item name="Status" label="Status">
									<Select defaultValue="NotStarted">
										<Select.Option value="NotStarted">
											Not Started
										</Select.Option>
										<Select.Option value="InProgress">
											In Progress
										</Select.Option>
										<Select.Option value="Finished">Finished</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item name="IsPrivate" label="">
									<Switch
										checkedChildren="Public"
										unCheckedChildren="Private"
									/>
								</Form.Item>
								<Form.Item name="">
									<Button type="primary" htmlType="submit">
										Edit
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</Content>
		</Layout>
	);
};

export default EventEdit;
