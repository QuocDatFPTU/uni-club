import axios from "axios";

export const getEvents = async (current = 1, pageSize = 10) => {
	let res = await axios.get(process.env.REACT_APP_API_URL + "events", {
		params: { "page-number": current, "page-size": pageSize }
	});
	return res.data.data;
};

export const getEventByID = async (id) => {
	let res = await axios.get(process.env.REACT_APP_API_URL + "events/" + id);
	return res.data.data;
};
