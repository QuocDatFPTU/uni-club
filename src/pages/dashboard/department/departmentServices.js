import axios from "axios";

// call api - default page 1, size 10
export const getDepartments = async (current = 1, pageSize = 10) => {
	let res = await axios.get(process.env.REACT_APP_API_URL + "departments", {
		params: { "page-number": current, "page-size": pageSize }
	});
	return res.data.data;
};

export const getClubByID = async (id) => {
	let res = await axios.get(
		process.env.REACT_APP_API_URL + "departments/" + id
	);
	return res.data.data;
};
