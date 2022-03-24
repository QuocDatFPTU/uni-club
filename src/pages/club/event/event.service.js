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
	const url = `/events`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}

export async function updateEvent(payload, id) {
	const url = `/events/${id}`;
	const newEvent = {
		...payload,
		id: id
	};
	return axiosClient.put(url, newEvent);
}

export async function deactiveEvent(payload) {
	const url = `/users/${payload}`;
	return axiosClient.delete(url);
}

export async function activeEvent(payload) {
	const url = `/users/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
