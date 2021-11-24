import axiosClient from "./../../../api/axiosClient";

const productTypeApi = {
  getAll() {
    const url = "/productTypes/listAndSearch";
    return axiosClient.get(url);
  },
};
export default productTypeApi;
