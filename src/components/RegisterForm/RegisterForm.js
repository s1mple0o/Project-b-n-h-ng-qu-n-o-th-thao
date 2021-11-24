import React, { useEffect, useState, useRef } from "react";
import "./css/RegisterForm.css";
import { useForm } from "react-hook-form";
import wardsApi from "./api/wardApi";
import districtsApi from "./api/districtApi";
import provicesApi from "./api/proviceApi";
import axiosClient from "../../api/axiosClient";
import toastifyAlert from "../../toastify-message/toastify";

function RegisterForm() {
  const urlRegisterUser = `/auth/signup`;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    let timeStamp = Date.parse(new Date(data.birthday));
    const formData = {
      name: data.name,
      email: data.email,
      birthDay: timeStamp,
      phoneNumber: data.phone,
      role: ["user"],
      username: data.username,
      password: data.password,
      wardId: Number(data.ward),
    };
    console.log(data);
    console.log(JSON.stringify(formData));
    axiosClient
      .post(urlRegisterUser, formData)
      .then((response) => {
        toastifyAlert.success(`Đăng ký thành công`);
      })
      .catch((err) => {
        toastifyAlert.warn(`Đăng ký thất bại`);
        console.log(err);
      });
  };

  const [wardList, setWardList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [proviceList, setProviceList] = useState([]);

  const [districtListFilter, setDistrictListFilter] = useState([]);
  const [wardListFilter, setWardListFilter] = useState([]);

  useEffect(() => {
    wardsApi.getAll().then((response) => {
      const data = response.data.data;
      setWardList(data);
    });
    districtsApi.getAll().then((response) => {
      const data = response.data.data;
      setDistrictList(data);
    });
    provicesApi.getAll().then((response) => {
      const data = response.data.data;
      setProviceList(data);
    });
  }, []);

  const onProviceChange = (e) => {
    const proviceId = e.target.value;
    const newDistrictList = districtList.filter(
      (e) => e.proviceId === Number(proviceId)
    );
    setDistrictListFilter(newDistrictList);
    document.getElementById("select-district").value = "";
    setWardListFilter([]);
  };

  const onDistrictChange = (e) => {
    const districtId = e.target.value;
    const newWardList = wardList.filter(
      (e) => e.districtId === Number(districtId)
    );
    document.getElementById("select-ward").value = "";
    setWardListFilter(newWardList);
  };
  return (
    <section class="h-100 h-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-8 col-xl-6">
            <div class="card rounded-3">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/img3.jpg"
                class="w-100"
                style={{
                  borderTopLeftRadius: ".3rem",
                  borderTopRightRadius: ".3rem",
                }}
                alt="Sample photo"
              />
              <div class="card-body p-4 p-md-5">
                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Đăng ký tài khoản
                </h3>

                <form class="px-md-2" onSubmit={handleSubmit(onSubmit)}>
                  <div class="form-outline mb-4">
                    <div class="error-alert">
                      {errors?.name?.type === "required" && (
                        <p class="p-alert-validate">Bạn chưa nhập tên</p>
                      )}
                      {errors?.name?.type === "maxLength" && (
                        <p class="p-alert-validate">
                          Tên không được quá 40 ký tự
                        </p>
                      )}
                    </div>
                    <input
                      type="text"
                      id="form3Example1q"
                      class="form-control"
                      {...register("name", { required: true, maxLength: 40 })}
                    />
                    <label class="form-label" for="form3Example1q">
                      Họ và tên
                    </label>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline datepicker">
                        <div class="error-alert">
                          {errors?.email?.type === "required" && (
                            <p class="p-alert-validate">Bạn chưa nhập email</p>
                          )}
                          {errors?.email?.type === "maxLength" && (
                            <p class="p-alert-validate">
                              Email không được quá 80 ký tự
                            </p>
                          )}
                          {errors?.email?.type === "pattern" && (
                            <p class="p-alert-validate">
                              Email không đúng định dạng
                            </p>
                          )}
                        </div>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleDatepicker1"
                          {...register("email", {
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email không đúng định dạng",
                            },
                            maxLength: 80,
                          })}
                        />
                        <label for="exampleDatepicker1" class="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline mb-4">
                        <div class="error-alert">
                          {errors?.phone?.type === "required" && (
                            <p class="p-alert-validate">
                              Bạn chưa nhập số điện thoại
                            </p>
                          )}
                          {errors?.phone?.type === "maxLength" && (
                            <p class="p-alert-validate">
                              Số điện thoại không được quá 11 ký tự
                            </p>
                          )}
                          {errors?.phone?.type === "minLength" && (
                            <p class="p-alert-validate">
                              Số điện thoại it nhất phải có 10 ký tự
                            </p>
                          )}
                          {errors?.phone?.type === "pattern" && (
                            <p class="p-alert-validate">
                              Số điện thoại không đúng định dạng
                            </p>
                          )}
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleDatepicker1"
                          {...register("phone", {
                            required: true,
                            pattern: {
                              value: /^[0-9\-\+]{9,15}$/i,
                              message: "Số điện thoại không đúng định dạng",
                            },
                            maxLength: 11,
                            minLength: 10,
                          })}
                        />
                        <label for="exampleDatepicker1" class="form-label">
                          Số điện thoại
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline datepicker">
                        <div class="error-alert">
                          {errors?.birthday?.type === "required" && (
                            <p class="p-alert-validate">
                              Bạn chưa nhập ngày sinh
                            </p>
                          )}
                        </div>
                        <input
                          type="date"
                          class="form-control"
                          id="exampleDatepicker1"
                          {...register("birthday", {
                            required: true,
                          })}
                        />
                        <label for="exampleDatepicker1" class="form-label">
                          Ngày sinh
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline mb-4">
                        <div class="error-alert"></div>
                        <input
                          type="text"
                          class="form-control"
                          value="user"
                          readOnly
                          id="exampleDatepicker1"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-outline mb-4">
                    <div class="error-alert">
                      {errors?.username?.type === "required" && (
                        <p class="p-alert-validate">
                          Bạn chưa nhập tên tài khoản
                        </p>
                      )}
                      {errors?.username?.type === "maxLength" && (
                        <p class="p-alert-validate">
                          Tên tài khoản không được quá 20 ký tự
                        </p>
                      )}
                      {errors?.username?.type === "minLength" && (
                        <p class="p-alert-validate">
                          Tên tài khoản it nhất phải có 7 ký tự
                        </p>
                      )}
                    </div>
                    <input
                      type="text"
                      id="form3Example1q"
                      class="form-control"
                      {...register("username", {
                        required: true,
                        maxLength: 20,
                        minLength: 7,
                      })}
                    />
                    <label class="form-label" for="form3Example1q">
                      Tên đăng nhập
                    </label>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline datepicker">
                        <div class="error-alert">
                          {errors?.password?.type === "required" && (
                            <p class="p-alert-validate">
                              Bạn chưa nhập mật khẩu
                            </p>
                          )}
                          {errors?.password?.type === "minLength" && (
                            <p class="p-alert-validate">
                              Mật khẩu ít nhất phải có 6 ký tự
                            </p>
                          )}
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleDatepicker1"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                          })}
                        />
                        <label for="exampleDatepicker1" class="form-label">
                          Mật khẩu
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline mb-4">
                        <div class="error-alert">
                          {errors?.confirmPassword?.type === "required" && (
                            <p class="p-alert-validate">
                              Bạn chưa nhập lại mật khẩu
                            </p>
                          )}
                          {errors?.confirmPassword?.type === "validate" && (
                            <p class="p-alert-validate">
                              Mật khẩu nhập lại chưa đúng
                            </p>
                          )}
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          id="exampleDatepicker1"
                          {...register("confirmPassword", {
                            required: true,
                            validate: (value) => value === password.current,
                          })}
                        />
                        <label for="exampleDatepicker1" class="form-label">
                          Nhập lại mật khẩu
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="error-alert">
                      {errors?.provice?.type === "required" && (
                        <p class="p-alert-validate">Bạn chưa chọn thành phố</p>
                      )}
                    </div>
                    <select
                      class="select"
                      id="select-provice"
                      {...register("provice", {
                        onChange: (e) => {
                          onProviceChange(e);
                        },
                        required: true,
                      })}
                    >
                      <option selected="selected" value="">
                        Nhấn để chọn
                      </option>
                      {proviceList &&
                        proviceList.map((item) => {
                          return (
                            <option value={item.id}>{item.proviceName}</option>
                          );
                        })}
                    </select>
                    <label class="form-label" for="form3Example1q">
                      Thành phố
                    </label>
                  </div>

                  <div class="mb-4">
                    <div class="error-alert">
                      {errors?.district?.type === "required" && (
                        <p class="p-alert-validate">Bạn chưa chọn quận/huyện</p>
                      )}
                    </div>
                    <select
                      class="select"
                      id="select-district"
                      {...register("district", {
                        onChange: (e) => {
                          onDistrictChange(e);
                        },
                        required: true,
                      })}
                    >
                      <option selected="selected" value="">
                        Nhấn để chọn
                      </option>
                      {districtListFilter &&
                        districtListFilter.map((item) => {
                          return (
                            <option value={item.id}>{item.districtName}</option>
                          );
                        })}
                    </select>
                    <label class="form-label" for="form3Example1q">
                      Quận/huyện
                    </label>
                  </div>

                  <div class="mb-4">
                    <div class="error-alert">
                      {errors?.ward?.type === "required" && (
                        <p class="p-alert-validate">
                          Bạn chưa chọn xã/phường/thị trấn
                        </p>
                      )}
                    </div>
                    <select
                      class="select"
                      id="select-ward"
                      {...register("ward", {
                        required: true,
                      })}
                    >
                      <option selected="selected" value="">
                        Nhấn để chọn
                      </option>
                      {wardListFilter &&
                        wardListFilter.map((item) => {
                          return (
                            <option value={item.id}>{item.wardName}</option>
                          );
                        })}
                    </select>
                    <label class="form-label" for="form3Example1q">
                      Xã/phường/thị trấn
                    </label>
                  </div>

                  <button type="submit" class="btn btn-success btn-lg mb-1">
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
