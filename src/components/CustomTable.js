import React from "react";
import { Button, Card, Layout, PageHeader, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomModal from "./CustomModal";

const extraButton = (showModal) => [
	<Button onClick={showModal} key="btn-comple" type="primary">
		{"Create"}
		<PlusOutlined />
	</Button>
];

let routes = null;
export const IdContext = React.createContext({
	id: -1,
	setId: (id) => {}
});

const DataTable = (props) => {
	const location = useLocation();
	const [data, setData] = useState(null);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		// change page
		onChange: async (page, pageSize) => {
			setPagination({
				...pagination,
				current: page,
				pageSize: pageSize
			});
			callAPI(page, pageSize);
		}
	});
	const [loading, setLoading] = useState(true);
	const [modalVisibleOn, setModalVisibleOn] = useState(false);
	const [EditOrCreate, setEditOrCreate] = useState(false);
	const [id, setId] = useState(-1);
	// call api - default page 1, size 10
	const callAPI = async (current = 1, pageSize = 10) => {
		setLoading(true);
		let res = await props.getData(current, pageSize);
		setData(res);
		setLoading(false);
	};
	//  first call
	useEffect(() => {
		setData([]);
		callAPI();
		routes = props.routes;
	}, []);

	const showModal = () => {
		setModalVisibleOn(true);
	};

	const hideModal = () => {
		setModalVisibleOn(false);
		setEditOrCreate(false);
	};

	return (
		<IdContext.Provider value={{ id, setId }}>
			<Layout className="layoutContent">
				<PageHeader
					ghost={false}
					title={"Member"}
					extra={extraButton(() => {
						showModal();
						setEditOrCreate(false);
					})}
					breadcrumb={{ routes }}
					className="customPageHeader"
				/>
				<Layout.Content>
					<Card size="small" className="cardSearch">
						{data == null ? (
							<Table dataSource={[]} loading={true} columns={props.columns} />
						) : (
							<Table
								loading={loading}
								columns={props.columns}
								dataSource={data.items}
								pagination={{
									...pagination,
									total: data["total-count"]
								}}
								onRow={(record, rowIndex) => {
									return {
										onClick: (enter) => {
											if (enter.target.tagName == "SPAN") {
												showModal();
												setEditOrCreate(true);
												setId(record.id);
											}
										}
									};
								}}
							/>
						)}
					</Card>
				</Layout.Content>
				<CustomModal visibleOn={modalVisibleOn} callbackVisiableOff={hideModal}>
					{EditOrCreate ? props.editForm : props.createForm}
				</CustomModal>
			</Layout>
		</IdContext.Provider>
	);
};

export default DataTable;
