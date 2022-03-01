import React, { useContext, useEffect, useState } from "react";
import { IdContext } from "../../../components/CustomTable";
import { Col, Row } from "antd";
import { getEventByID } from "./eventServices";
import moment from "moment";
const EventDetails = () => {
	const { id } = useContext(IdContext);
	const [clubEvent, setClubEvent] = useState(null);
	useEffect(() => {
		const getData = async () => {
			let data = await getEventByID(id);
			setClubEvent(data);
			console.log(data);
		};
		getData();
	}, []);
	return clubEvent != null ? (
		<>
			<Row>
				<Col span={7}>Name</Col>
				<Col span={12}>{clubEvent["event-name"]}</Col>
			</Row>
			<Row>
				<Col span={7}>Start Date</Col>
				<Col span={12}>
					{moment(clubEvent["start-date"], "YYYY-MM-DD").format("DD-MM-YYYY")}
				</Col>
			</Row>
			<Row>
				<Col span={7}>End Date</Col>
				<Col span={12}>
					{moment(clubEvent["end-date"], "YYYY-MM-DD").format("DD-MM-YYYY")}
				</Col>
			</Row>
			<Row>
				<Col span={7}>Description</Col>
				<Col span={12}>{clubEvent["description"]}</Col>
			</Row>
			<Row>
				<Col span={7}>Location</Col>
				<Col span={12}>{clubEvent["location"]}</Col>
			</Row>
			<Row>
				<Col span={7}>Max participants</Col>
				<Col span={12}>{clubEvent["max-participants"]}</Col>
			</Row>
			<Row>
				<Col span={7}>Point</Col>
				<Col span={12}>{clubEvent["point"]}</Col>
			</Row>
			<Row>
				<Col span={7}>Type</Col>
				<Col span={12}>{clubEvent["is-private"] ? "private" : "public"}</Col>
			</Row>
		</>
	) : (
		<></>
	);
};

export default EventDetails;
