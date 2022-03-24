import axiosClient from "../../../util/axiosClient";
export const getTaskList = async (params) => {
	const url = "/club-tasks";
	return axiosClient.get(url, { params });
};

export async function getTaskByID(id) {
	const url = `/club-tasks/${id}`;
	return axiosClient.get(url);
}

export async function createTask(payload) {
	const url = `/club-tasks`;
	const newEvent = {
		...payload
	};
	return axiosClient.post(url, newEvent);
}

export async function updateTask(payload, id) {
	const url = `/club-tasks/${id}`;
	const newEvent = {
		...payload,
		id: id
	};
	return axiosClient.put(url, newEvent);
}

export async function deactiveTask(payload) {
	const url = `/club-tasks/${payload}`;
	return axiosClient.delete(url);
}

export async function activeTask(payload) {
	const url = `/club-tasks/${payload.id}/recover`;
	return axiosClient.put(url, payload);
}
