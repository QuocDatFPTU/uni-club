import axiosClient from "../../../util/axiosClient";
import axiosForm from "../../../util/axiosFormCreate";
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
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosForm.post(url, formData);
}

export async function updateEvent(payload, id) {
	const url = `/events/${id}`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosForm.put(url, formData);
}

export async function deactiveEvent(payload) {
	const url = `/users/${payload}`;
	return axiosClient.delete(url);
}

export async function activeEvent(payload) {
	const url = `/users/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
