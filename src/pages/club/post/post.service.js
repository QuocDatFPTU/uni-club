import axiosClient from "../../../util/axiosClient";
export const getPostList = async (params) => {
	const url = "/club-tasks";
	return axiosClient.get(url, { params });
};

export async function getPostByID(id) {
	const url = `/club-tasks/${id}`;
	return axiosClient.get(url);
}

export async function createPost(payload) {
	const url = `/club-tasks`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}

export async function updatePost(payload, id) {
	const url = `/club-tasks/${id}`;
	const newEvent = {
		...payload,
		id: id
	};
	return axiosClient.put(url, newEvent);
}

export async function deactivePost(payload) {
	const url = `/club-tasks/${payload}`;
	return axiosClient.delete(url);
}

export async function activePost(payload) {
	const url = `/club-tasks/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
