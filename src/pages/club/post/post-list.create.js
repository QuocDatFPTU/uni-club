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
import React, { useEffect, useState } from "react";
import { formatDate, formatDateTimeFull } from "../../../util/constant";
import { getEventList } from "../event/event.service";
import { createPost } from "./post.service";

const success = () => {
	Modal.success({
		content: "Create success",
		onOk() {
			window.history.back();
		}
	});
};

const PostCreate = () => {
	const [eventList, setEventList] = useState([]);

	const fetchEventList = async () => {
		let res = await getEventList();
		console.log(res.data.items);
		setEventList(res.data.items);
	};

	useEffect(() => {
		fetchEventList();
	}, []);

	const onFinish = async (values) => {
		values["person-id"] = localStorage.getItem("id");
		let res = await createPost(values);
		if (res != null) {
			success();
		}
	};
	return (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Create Post"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form onFinish={onFinish} layout="vertical">
						<Row>
							<Col offset={4} span={8}>
								<Form.Item
									name="Title"
									label="Title"
									rules={[
										{
											required: true,
											message: "Title must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="ShortDescription"
									label="Short description"
									rules={[
										{
											required: true,
											message: "Description must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="Content"
									label="Content"
									rules={[
										{
											required: true,
											message: "Content must be entered!"
										}
									]}
								>
									<TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
								</Form.Item>
								<Form.Item
									name="Status"
									label="Status"
									rules={[
										{
											required: true,
											message: "Status must be entered!"
										}
									]}
								>
									<Select>
										<Select.Option value="Unavalable">
											Unavailable
										</Select.Option>
										<Select.Option value="Available">Available</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									name="EventId"
									label="Event"
									rules={[
										{
											required: true,
											message: "Event must be entered!"
										}
									]}
								>
									<Select>
										{eventList.map((e) => {
											return (
												<Select.Option value={e.id}>
													{e["event-name"]}
												</Select.Option>
											);
										})}
									</Select>
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

export default PostCreate;
