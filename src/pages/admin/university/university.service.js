import axiosClient from "../../../util/axiosClient";
import axiosFormCreate from "../../../util/axiosFormCreate";
export async function getListUni(params) {
	const url = "/universities";
	return axiosClient.get(url, { params });
}

export async function getUniById(id) {
	const url = `/universities/${id}`;
	return axiosClient.get(url);
}

export async function updateUni(payload) {
	const uniId = payload.Id;
	const url = `/universities/${uniId}`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosFormCreate.put(url, formData);
}

export async function createUni(payload) {
	const url = `/universities`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosFormCreate.post(url, formData);
}

export async function deactiveUni(payload) {
	const url = `/universities/${payload}`;
	return axiosClient.delete(url);
}

export async function activeUni(payload) {
	const url = `/universities/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
