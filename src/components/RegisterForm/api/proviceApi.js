import axiosClient from "../../../api/axiosClient";
const provicesApi = {
  getAll() {
    const url = `/v1/country/listProvice`;
    return axiosClient.get(url);
  },
};

export default provicesApi;
