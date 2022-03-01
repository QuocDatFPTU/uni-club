import React from "react";
import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 12 }
};

const validateMessages = {
	required: "${label} is required!"
};

const EventCreateForm = (props) => {
	return (
		<Form
			{...layout}
			onFinish={(club) => props.onFinish(club)}
			name="nest-messages"
			validateMessages={validateMessages}
		>
			<Form.Item
				name={"club-name"}
				label="Club name"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={"short-name"}
				label="Short name"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={"description"}
				label="Description"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={"short-description"}
				label="Short description"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name={"slogan"} label="Slogan" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 10, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default EventCreateForm;
