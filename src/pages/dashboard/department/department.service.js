import axiosClient from "../../../util/axiosClient";

export const getDepaList = async (params) => {
	const url = "/departments";
	return axiosClient.get(url, { params });
};
