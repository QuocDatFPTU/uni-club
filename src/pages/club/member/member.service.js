import axiosClient from "../../../util/axiosClient";
export const getMemberList = async (params) => {
	const url = "/events";
	return axiosClient.get(url, { params });
};

export async function getMemberByID(id) {
	const url = `/events/${id}`;
	return axiosClient.get(url);
}

export async function createMember(payload) {
	const url = `/event`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}
