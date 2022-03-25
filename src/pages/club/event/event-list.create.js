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
	Modal,
	Select
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
		values["EndDate"] =
			moment(values["EndDate"], formatDate).format(formatDateTimeFull) + "Z";
		values["StartDate"] =
			moment(values["StartDate"], formatDate).format(formatDateTimeFull) + "Z";
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
							IsPrivate: false,
							ImageUrl: "",
							Status: "NotStarted"
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
