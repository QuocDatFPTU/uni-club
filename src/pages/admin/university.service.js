import axiosClient from "../../../src/util/axiosClient";

export async function getListUni(params) {
	const url = "/universities";
	return axiosClient.get(url, { params });
}

export async function getUniById(id) {
	const url = `/universities/${id}`;
	return axiosClient.get(url);
}

export async function updateUni(payload) {
	const clubId = payload.id;
	const url = `/universities/${clubId}`;
	const updateValue = {
		...payload
	};
	return axiosClient.put(url, updateValue);
}

export async function createUni(payload) {
	const url = `/universities`;
	const newClub = {
		...payload
	};
	return axiosClient.post(url, newClub);
}
