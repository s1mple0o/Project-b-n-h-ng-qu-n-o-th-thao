import axiosClient from "./../../../api/axiosClient";

const optionApi = {
  getById(id) {
    const url = `/option/findById?id=${id}`;
    return axiosClient.get(url);
  },
};

export default optionApi;
