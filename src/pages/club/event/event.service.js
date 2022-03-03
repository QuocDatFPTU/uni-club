import axiosClient from "../../../util/axiosClient";
export const getEventList = async (params) => {
	const url = "/events";
	return axiosClient.get(url, { params });
};

export async function getEventByID(id) {
	const url = `/events/${id}`;
	return axiosClient.get(url);
}

export async function createEvent(payload) {
	const url = `/event`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}
