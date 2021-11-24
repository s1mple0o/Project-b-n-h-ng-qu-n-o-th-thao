import axiosClient from "../../../api/axiosClient";

const wardsApi = {
  getAll() {
    const url = `/v1/country/listWard`;
    return axiosClient.get(url);
  },
};

export default wardsApi;
