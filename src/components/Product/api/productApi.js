import axiosClient from "./../../../api/axiosClient";
const productApi = {
  getAll(pageP, limitP) {
    const url = "/product/listAndSearch";
    if (
      (pageP === null || pageP === undefined) &&
      (limitP === null || limitP === undefined)
    ) {
      return axiosClient.get(url);
    } else {
      return axiosClient.get(url, {
        params: {
          page: pageP,
          limit: limitP,
        },
      });
    }
  },
  getById(id) {
    const url = `/product/findById?id=${id}`;
    return axiosClient.get(url);
  },
  getProductNewest() {
    const url = `/product/listTop`;
    return axiosClient.get(url);
  },
  getProductByTypeId(id) {
    const url = `/product/findProductByTypeId?id=${id}`;
    return axiosClient.get(url);
  },
};

export default productApi;
