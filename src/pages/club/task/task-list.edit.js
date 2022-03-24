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
import { getTaskByID, updateTask } from "./task.service";

const success = () => {
	Modal.success({
		content: "Success",
		onOk() {
			window.history.back();
		}
	});
};

const TaskEdit = () => {
	const [eventList, setEventList] = useState([]);
	const { id } = useParams();
	const [task, setTask] = useState();
	const fetchEventList = async () => {
		let res = await getEventList();
		setEventList(res.data.items);
	};

	const fetchTask = async () => {
		let res = await getTaskByID(id);
		console.log(res.data);
		setTask(res.data);
	};

	useEffect(() => {
		fetchEventList();
		fetchTask();
	}, []);

	const onFinish = async (values) => {
		values["end-date"] =
			moment(values["end-date"], formatDate).format(formatDateTimeFull) + "Z";
		values["start-date"] =
			moment(values["start-date"], formatDate).format(formatDateTimeFull) + "Z";
		let res = await updateTask(values, id);
		if (res != null) {
			success();
		}
	};
	return task == null ? (
		<Spin />
	) : (
		<Layout className="layoutContent">
			<PageHeader
				onBack={() => window.history.back()}
				ghost={false}
				title="Create Post"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form
						initialValues={{
							...task,
							"start-date": moment(task["start-date"]),
							"end-date": moment(task["start-date"])
						}}
						onFinish={onFinish}
						layout="vertical"
					>
						<Row>
							<Col offset={4} span={8}>
								<Form.Item
									name="task-name"
									label="Task name"
									rules={[
										{
											required: true,
											message: "Task name must be entered!"
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
									name="description"
									label="Description"
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
									name="status"
									label="Status"
									rules={[
										{
											required: true,
											message: "Status must be entered!"
										}
									]}
								>
									<Select>
										<Select.Option value="Undone">Undone</Select.Option>
										<Select.Option value="NotStarted">NotStarted</Select.Option>
										<Select.Option value="InProgress">InProgress</Select.Option>
										<Select.Option value="Done">Done</Select.Option>
									</Select>
								</Form.Item>
								<Form.Item
									name="event-id"
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

export default TaskEdit;
