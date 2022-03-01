import axiosClient from "../../../util/axiosClient";

export async function getListClub(params) {
  const url = "/clubs";
  return axiosClient.get(url, { params });
}

export async function getClubByID(id) {
  const url = `/clubs/${id}`;
  return axiosClient.get(url);
}
