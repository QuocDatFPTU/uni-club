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
import { activePost, deactivePost, getPostList } from "./post.service";

const defaultSort = {
	"is-ascending": "true",
	"order-by": "Id"
};
const PostList = () => {
	const navigate = useNavigate();
	const [eventList, setEventList] = useState([]);
	const [loading, setLoading] = useState(false);
	//Pagination
	const [params, setParams] = useState({ ...defaultPage });
	const [totalItem, setTotalItem] = useState();
	const [sortedInfo] = useState(defaultSort);
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
			deactivePost(id);
			setIsDeactive(false);
		}
	};
	const active = () => {
		if (id != null) {
			activePost({ id: id });
			setIsActive(false);
		}
	};

	const fetchEvent = (params, sortedInfo, status) => {
		setLoading(true);
		let p = { ...params, ...sortedInfo };
		if (status != null && status != "") {
			p["is-deleted"] = status;
		}
		getPostList(p)
			.then((result) => {
				setEventList([...result.data.items]);
				setTotalItem(result.data["total-count"]);
				setLoading(false);
			})
			.catch((e) => setLoading(false));
	};

	useEffect(() => {
		fetchEvent(params, sortedInfo, status);
	}, [params, sortedInfo, status, isActive, isDeactive]);

	const columns = [
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			width: "14%",
			ellipsis: true
		},
		{
			title: "Creation time",
			dataIndex: "creation-time",
			key: "start-date",
			width: "12%",
			render: (time) => {
				return moment(time, formatDateTimeFull).format(formatDate);
			}
		},
		{
			title: "Status",
			dataIndex: "is-deleted",
			align: "center",
			width: "5%",
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
		},
		{
			title: "Action",
			align: "center",
			width: "8%",
			fixed: "right",
			render: (text, record) => (
				<div style={{ display: "flex", justifyContent: "space-around" }}>
					<Button
						type="link"
						size="small"
						icon={<EditOutlined />}
						onClick={() => {
							navigate(`/club/edit-post/${record.id}`);
						}}
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
				navigate("/club/create-post");
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
			path: "/dashboard/club",
			breadcrumbName: "Club"
		}
	];

	return (
		<Layout className="layoutContent">
			<PageHeader
				ghost={false}
				title="Post"
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
								<h3> {"Post List"}</h3>
							</Col>
						</Row>
					)}
					rowKey="id"
					loading={loading}
					bordered
					columns={columns}
					dataSource={eventList}
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
				<p>Do you want to deactive this post?</p>
			</Modal>
			<Modal
				title="Confirm"
				visible={isActive}
				onOk={active}
				onCancel={onCancel}
				okText="Active"
				cancelText="Cancel"
			>
				<p>Do you want to active this post?</p>
			</Modal>
		</Layout>
	);
};

export default PostList;
