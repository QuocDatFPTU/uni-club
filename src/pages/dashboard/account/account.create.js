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
import { success } from "../../../components/CustomSuccessModal";
import {
	formatDate,
	formatDateTimeFull,
	formatDateYearFirst
} from "../../../util/constant";
import { createClubAdmin, getListClub } from "./account.service";

const { Option } = Select;

const ClubAccountCreate = () => {
	const [clubList, setClubList] = useState([]);

	const getList = async () => {
		let res = await getListClub();
		setClubList(res.data.items);
	};

	useEffect(() => {
		getList();
	}, []);
	const onFinish = async (values) => {
		let res = await createClubAdmin(values);
		if (res != null) {
			success("Create success");
		}
	};

	return (
		<Layout className="layoutContent">
			<PageHeader
				ghost={false}
				title="Create Account"
				className="customPageHeader"
			/>
			<Content style={{ backgroundColor: "white" }}>
				<div className="site-layout-content">
					<Form onFinish={onFinish} layout="vertical">
						<Row>
							<Col offset={4} span={5}>
								<Form.Item name="UploadedLogo" label="University Image">
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
									name="UserName"
									label="Username"
									rules={[
										{
											required: true,
											message: "Username must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="Name"
									label="Name"
									rules={[
										{
											required: true,
											message: "Name must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="Email"
									label="Email"
									rules={[
										{
											required: true,
											message: "Address must be entered!"
										}
									]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									name="Password"
									label="Password"
									rules={[
										{
											required: true,
											message: "Phone must be entered!"
										}
									]}
								>
									<Input type="password" />
								</Form.Item>
								<Form.Item
									name="ClubId"
									label="Club"
									rules={[
										{
											required: true,
											message: "Website participants must be entered!"
										}
									]}
								>
									<Select>
										{clubList.map((club) => {
											return (
												<Option value={club.id}>
													{club["club-name"]} ({club["short-name"]})
												</Option>
											);
										})}
									</Select>
								</Form.Item>
								<Form.Item name="is-private">
									<Button type="primary" htmlType="submit">
										Create
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

export default ClubAccountCreate;
