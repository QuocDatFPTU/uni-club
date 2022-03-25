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
	Select,
	Spin
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatDateTimeFull } from "../../../util/constant";
import { getEventList } from "../event/event.service";
import { createPost, getPostByID, updatePost } from "./post.service";

const success = () => {
	Modal.success({
		content: "Create success",
		onOk() {
			window.history.back();
		}
	});
};

const PostEdit = () => {
	const [eventList, setEventList] = useState([]);
	const { id } = useParams();
	const [post, setPost] = useState();

	const fetchEventList = async () => {
		let res = await getEventList();
		setEventList(res.data.items);
	};

	const fetchPost = async () => {
		let res = await getPostByID(id);
		setPost(res.data);
	};

	useEffect(() => {
		fetchEventList();
		fetchPost();
	}, []);

	const onFinish = async (values) => {
		values.id = id;
		let res = await updatePost(values, id);
		if (res != null) {
			success();
		}
	};
	return post == null ? (
		<Spin />
	) : (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Edit Task"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form
						initialValues={{
							Title: post.title,
							ShortDescription: post["short-description"],
							Content: post.content,
							Status: post.status,
							EventId: post["event-id"]
						}}
						onFinish={onFinish}
						layout="vertical"
					>
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
			{/* <Modal title="Basic Modal" visible={isCreated} onBack>
				<p>Create success</p>
			</Modal> */}
		</Layout>
	);
};

export default PostEdit;
