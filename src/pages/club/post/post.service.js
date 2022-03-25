import axiosClient from "../../../util/axiosClient";
import axiosForm from "../../../util/axiosFormCreate";
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
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosForm.post(url, formData);
}

export async function updatePost(payload, id) {
	const url = `/posts/${id}`;
	let formData = new FormData();
	for (let [key, val] of Object.entries(payload)) {
		// append each item to the formData (converted to JSON strings)
		formData.append(key, val);
	}
	return axiosForm.put(url, formData);
}

export async function deactivePost(payload) {
	const url = `/posts/${payload}`;
	return axiosClient.delete(url);
}

export async function activePost(payload) {
	const url = `/posts/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
