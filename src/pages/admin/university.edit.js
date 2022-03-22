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
	Spin
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { success } from "../../components/CustomSuccessModal";
import { formatDate, formatDateTimeFull } from "../../util/constant";
import { getUniById, updateUni } from "./university.service";
const UniEdit = () => {
	const [event, setEvent] = useState(null);
	const { id } = useParams();
	const fetchEvent = async (id) => {
		let res = await getUniById(id);
		console.log(res.data);
		setEvent(res.data);
	};

	useEffect(() => {
		fetchEvent(id);
	}, []);

	const onFinish = async (values) => {
		values["end-date"] =
			moment(values["end-date"], formatDate).format(formatDateTimeFull) + "Z";
		values["start-date"] =
			moment(values["start-date"], formatDate).format(formatDateTimeFull) + "Z";
		let res = await updateUni(values, id);
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
							description: event.description,
							"event-name": event["event-name"],
							"is-private": event["is-private"],
							location: event.location,
							"max-participants": event["max-participants"],
							point: event.point,
							"image-url": event["image-url"],
							"start-date": moment(event["start-date"]),
							"end-date": moment(event["start-date"])
						}}
						onFinish={onFinish}
						layout="vertical"
					>
						<Row>
							<Col offset={4} span={5}>
								<Form.Item name="avatar-url" label="Event Image">
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
									name="event-name"
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
									name="start-date"
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
									name="end-date"
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
									name="location"
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
									name="point"
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
									name="max-participants"
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
									name="description"
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
								<Form.Item name="is-private" label="Status">
									<Switch
										checkedChildren="Public"
										unCheckedChildren="Private"
									/>
								</Form.Item>
								<Form.Item name="is-private">
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

export default UniEdit;
