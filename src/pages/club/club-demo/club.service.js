import axiosClient from "../../../util/axiosClient";

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
	const newClub = {
		...payload,
		"uni-id": 1
	};
	return axiosClient.post(url, newClub);
}

export async function deactiveClub(payload) {
	const url = `/clubs/${payload}`;
	return axiosClient.delete(url);
}

export async function activeClub(payload) {
	const url = `/clubs/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
