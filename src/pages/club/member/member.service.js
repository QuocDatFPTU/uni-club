import axiosClient from "../../../util/axiosClient";
export const getMemberList = async (params) => {
	const url = "/club-members";
	return axiosClient.get(url, { params });
};

export async function getMemberByID(id) {
	const url = `/club-members/${id}`;
	return axiosClient.get(url);
}

export async function createMember(payload) {
	const url = `/club-members`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}
