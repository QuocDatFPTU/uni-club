import axiosClient from "../../../util/axiosClient";
import axiosForm from "../../../util/axiosFormCreate";
export async function getListClub(params) {
	const url = "/clubs";
	return axiosClient.get(url, { params });
}

export async function getClubByID(id) {
	const url = `/clubs/${id}`;
	return axiosClient.get(url);
}

export async function updateClub(payload) {
	const clubId = payload.id;
	const url = `/clubs/${clubId}`;
	const updateValue = {
		...payload,
		"uni-id": 1
	};
	return axiosClient.put(url, updateValue);
}

export async function createClub(payload) {
	const url = `/clubs`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosForm.post(url, formData);
}

export async function deactiveClub(payload) {
	const url = `/clubs/${payload}`;
	return axiosClient.delete(url);
}

export async function activeClub(payload) {
	const url = `/clubs/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
