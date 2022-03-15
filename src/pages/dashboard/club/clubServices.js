import axios from "axios";

// call api - default page 1, size 10
export const getClubs = async (current = 1, pageSize = 10) => {
	let res = await axios.get(process.env.REACT_APP_API_URL + "clubs", {
		params: { "uni-id": 1, "page-number": current, "page-size": pageSize }
	});
	return res.data.data;
};

export const getClubByID = async (id) => {
	let res = await axios.get(process.env.REACT_APP_API_URL + "clubs/" + id);
	return res.data.data;
};

export const createClub = async (club) => {
	let res = await axios.post(process.env.REACT_APP_API_URL + "clubs", {
		...club,
		"uni-id": 1,
		"established-date": "2022-02-27T12:33:22.007Z",
		"avatar-url": ""
	});
	return res;
};

export const editClub = async (club) => {};
