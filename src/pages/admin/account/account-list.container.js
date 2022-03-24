import { EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Form,
	Input,
	Layout,
	Modal,
	PageHeader,
	Row,
	Select,
	Switch
} from "antd";
import { pickBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCustom from "../../../components/TableCustom";
import {
	defaultPage,
	formatDate,
	formatDateTime,
	formatDateTimeFull
} from "../../../util/constant";
import {
	getListAccount,
	deactiveAccount,
	activeAccount
} from "./account.service";

const defaultSort = {
	"is-ascending": "true",
	"order-by": "Id"
};
const AccountList = () => {
	const navigate = useNavigate();
	const [uniList, setUniList] = useState([]);
	const [loading, setLoading] = useState(false);
	//Pagination
	const [params, setParams] = useState({ ...defaultPage });
	const [totalItem, setTotalItem] = useState();
	const [sortedInfo] = useState(defaultSort);
	const [role, setRole] = useState(null);
	const [form] = Form.useForm();
	const [status, setStatus] = useState(null);

	const [id, setID] = useState();
	const [isActive, setIsActive] = useState(false);
	const [isDeactive, setIsDeactive] = useState(false);
	const onCancel = () => {
		setIsActive(false);
		setIsDeactive(false);
	};
	const deactive = () => {
		if (id != null) {
			deactiveAccount(id);
			setIsDeactive(false);
		}
	};
	const active = () => {
		if (id != null) {
			activeAccount({ id: id });
			setIsActive(false);
		}
	};

	const fetchUni = (params, sortedInfo, role, status) => {
		setLoading(true);
		let p = { ...params, ...sortedInfo };
		if (role != null && role != "") {
			p.role = role;
		} else if (status != null && status != "") {
			p["is-deleted"] = status;
		}
		getListAccount(p)
			.then((result) => {
				setUniList([...result.data.items]);
				setTotalItem(result.data["total-count"]);
				setLoading(false);
			})
			.catch((e) => setLoading(false));
	};

	useEffect(() => {
		fetchUni(params, sortedInfo, role, status);
	}, [params, sortedInfo, role, isActive, isDeactive, status]);

	const columns = [
		{
			title: "Username",
			dataIndex: "user-name",
			width: "8%",
			ellipsis: true
		},
		{
			title: "Email",
			dataIndex: "email",
			width: "8%"
		},
		{
			title: "Status",
			dataIndex: "is-deleted",
			align: "center",
			width: "8%",
			fixed: "right",
			render: (text, record) => (
				<div style={{ display: "flex", justifyContent: "space-around" }}>
					<Switch
						onChange={(e) => {
							setID(record.id);
							if (e) {
								setIsActive(true);
							} else {
								setIsDeactive(true);
							}
						}}
						checkedChildren="Active"
						unCheckedChildren="Inactive"
						checked={!record["is-deleted"]}
					/>
				</div>
			)
		}
	];

	const extraButton = [
		<Button
			key="btn-complete"
			type="primary"
			onClick={() => {
				navigate("/admin/create-account");
			}}
		>
			{"Create"}
			<PlusOutlined />
		</Button>
	];

	const routes = [
		{
			path: "/dashboard",
			breadcrumbName: "Home"
		},
		{
			path: "/dashboard",
			breadcrumbName: "University"
		}
	];

	return (
		<Layout className="layoutContent">
			<PageHeader
				ghost={false}
				title="Account"
				extra={extraButton}
				breadcrumb={routes}
				className="customPageHeader"
			/>
			<Layout.Content>
				<Card size="small" className="cardSearch">
					<Row>
						<Col span={12}>
							<Form
								form={form}
								layout="horizontal"
								className="customFormSearch"
								onFinish={(value) => {
									const cleanValue = pickBy(
										value,
										(v) => v !== undefined && v !== ""
									);
									setParams({
										...cleanValue,
										"page-number": 1,
										"page-size": params["page-size"]
									});
								}}
							>
								<Row gutter={16}>
									<Col xxl={{ span: 12 }}>
										<Form.Item name="search-value">
											<Input placeholder="keyword" allowClear={true} />
										</Form.Item>
									</Col>
									<Col>
										<Form.Item>
											<Button
												type="primary"
												ghost
												icon={<SearchOutlined />}
												htmlType="submit"
											>
												{"Search"}
											</Button>
										</Form.Item>
									</Col>
								</Row>
							</Form>
						</Col>
						<Col span={6}>
							<Row span={12}>
								<Form.Item label="Role" name="role">
									<Select
										defaultValue=""
										style={{ width: 180 }}
										onChange={(e) => {
											setRole(e);
										}}
									>
										<Select.Option value="">All</Select.Option>
										<Select.Option value="SystemAdministrator">
											System Administrator
										</Select.Option>
										<Select.Option value="SchoolAdmin">
											School Admin
										</Select.Option>
										<Select.Option value="ClubAdmin">Club Admin</Select.Option>
										<Select.Option value="Student">Student</Select.Option>
									</Select>
								</Form.Item>
							</Row>
						</Col>
						<Col span={6}>
							<Row span={12}>
								<Form.Item label="Status" name="status">
									<Select
										defaultValue=""
										style={{ width: 180 }}
										onChange={(e) => {
											setStatus(e);
										}}
									>
										<Select.Option value="">Active</Select.Option>
										<Select.Option value="true">All</Select.Option>
									</Select>
								</Form.Item>
							</Row>
						</Col>
					</Row>
				</Card>
				<TableCustom
					title={() => (
						<Row>
							<Col span={12}>
								<h3> {"Account List"}</h3>
							</Col>
						</Row>
					)}
					rowKey="id"
					loading={loading}
					bordered
					columns={columns}
					dataSource={uniList}
					onChange={(pagination, filters, sorter) => {
						window.scrollTo({ top: 0, behavior: "smooth" });
						if (pagination.pageSize !== params["page-size"]) {
							params["page-number"] = 1;
						} else {
							params["page-number"] = pagination.current;
						}
						params["page-size"] = pagination.pageSize;
						setParams({ ...params });
					}}
					pagination={{
						total: totalItem,
						showSizeChanger: true,
						pageSize: params["page-size"],
						current: params["page-number"]
					}}
					scroll={{ x: 1200 }}
				/>
			</Layout.Content>
			<Modal
				title="Confirm"
				visible={isDeactive}
				onOk={deactive}
				onCancel={onCancel}
				okText="Deactive"
				cancelText="Cancel"
			>
				<p>Do you want to deactive this user?</p>
			</Modal>
			<Modal
				title="Confirm"
				visible={isActive}
				onOk={active}
				onCancel={onCancel}
				okText="Active"
				cancelText="Cancel"
			>
				<p>Do you want to active this user?</p>
			</Modal>
		</Layout>
	);
};

export default AccountList;
