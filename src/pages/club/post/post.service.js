import axiosClient from "../../../util/axiosClient";
export const getPostList = async (params) => {
	const url = "/posts";
	return axiosClient.get(url, { params });
};

export async function getPostByID(id) {
	const url = `/posts/${id}`;
	return axiosClient.get(url);
}

export async function createPost(payload) {
	const url = `/posts`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}

export async function updatePost(payload, id) {
	const url = `/posts/${id}`;
	const newEvent = {
		...payload
	};
	return axiosClient.put(url, newEvent);
}

export async function deactivePost(payload) {
	const url = `/posts/${payload}`;
	return axiosClient.delete(url);
}

export async function activePost(payload) {
	const url = `/posts/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
