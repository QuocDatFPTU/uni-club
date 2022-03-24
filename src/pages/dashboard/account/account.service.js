import axiosClient from "../../../util/axiosClient";
import axiosFormCreate from "../../../util/axiosFormCreate";

export async function createClubAdmin(payload) {
	const url = `/clubs/${payload.clubId}/club-admin`;
	console.log(payload);
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosFormCreate.post(url, formData);
}

export async function getListClub(params) {
	const url = "/clubs";
	return axiosClient.get(url, { params });
}
