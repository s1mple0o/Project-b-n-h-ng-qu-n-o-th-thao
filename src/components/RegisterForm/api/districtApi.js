import axiosClient from "../../../api/axiosClient";
const districtsApi = {
  getAll() {
    const url = `/v1/country/listDistrict`;
    return axiosClient.get(url);
  },
};
export default districtsApi;
