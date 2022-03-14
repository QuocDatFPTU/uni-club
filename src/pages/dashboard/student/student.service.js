import axiosClient from "../../../util/axiosClient";

export const getStudentList = async (params) => {
	const url = "/students";
	return axiosClient.get(url, { params });
};
