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
	Modal
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import React, { useState } from "react";
import { formatDate, formatDateTimeFull } from "../../../util/constant";
import { createEvent } from "./event.service";

const success = () => {
	Modal.success({
		content: "Create success",
		onOk() {
			window.history.back();
		}
	});
};

const EventCreate = () => {
	const onFinish = async (values) => {
		values["end-date"] =
			moment(values["end-date"], formatDate).format(formatDateTimeFull) + "Z";
		values["start-date"] =
			moment(values["start-date"], formatDate).format(formatDateTimeFull) + "Z";
		let res = await createEvent(values);
		console.log(res);
		if (res != null) {
			success();
		}
	};
	return (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Create Event"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form
						initialValues={{
							"is-private": false,
							"avatar-url": "",
							status: "NotStarted"
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
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Create
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</div>
			</Content>
			{/* <Modal title="Basic Modal" visible={isCreated} onBack>
				<p>Create success</p>
			</Modal> */}
		</Layout>
	);
};

export default EventCreate;
