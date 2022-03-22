import axiosClient from "../../../util/axiosClient";
import axiosFormCreate from "../../../util/axiosFormCreate";
export async function getListAccount(params) {
	const url = "/users?role=ClubAdmin";
	return axiosClient.get(url, { params });
}

export async function getAccountById(id) {
	const url = `/users/${id}`;
	return axiosClient.get(url);
}

export async function updateAccount(payload) {
	const uniId = payload.Id;
	const url = `/users/${uniId}`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosFormCreate.put(url, formData);
}

export async function createSchoolAdmin(payload) {
	const url = `/users/ClubAdmin`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosFormCreate.post(url, formData);
}