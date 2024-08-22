// import { useMutation } from "react-query";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setToken, setUser } from "../../redux/store/authSlice";
// import { serviceType } from "../baseUrl";
// import { toast } from "sonner";

// interface LoginPayload {
//   username: string;
//   password: string;
//   device_name: string;
// }

// interface LoginResponse {
//   token: string;
// }

// const base = axios.create({
//   baseURL: serviceType,
// });

// const handleErrors = (err: any) => {
//   const response = err.response;
//   switch (response?.status) {
//     case 500:
//       toast.error(response.data.message);
//       break;

//     case 400:
//     case 401:
//     case 404:
//     case 403:
//     case 422:
//       if (response.data.errors) {
//         if (Array.isArray(response.data.errors)) {
//           response.data.errors.forEach((each: any) => {
//             toast.error(each.message);
//           });
//         } else if (typeof response.data.errors === "object") {
//           if (response.data.errors.length > 0) {
//             Object.keys(response.data.errors).forEach((field) => {
//               const errors = response.data.errors[field];
//               errors.forEach((errorMessage: any) => {
//                 toast.error(errorMessage);
//               });
//             });
//           } else {
//             toast.error(response.data.errors.message);
//           }
//         }
//       } else if (response.data.error) {
//         toast.error(response.data.error);
//       } else {
//         toast.error(response.data.message);
//       }
//       break;

//     default:
//       toast.error(err.message);
//       break;
//   }
// };

// const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
//   const { data } = await base.post(`/api/v1/login`, payload, {
//     headers: {
//       "Content-Type": "application/json",
//       accept: "application/json",
//     },
//   });
//   return data;
// };

// export const useLoginMutation = () => {
//   const dispatch = useDispatch();

//   return useMutation<LoginResponse, Error, LoginPayload>(loginUser, {
//     onSuccess: (data: any) => {
//       dispatch(setToken(data?.data?.token));
//       dispatch(setUser(data?.data?.user));
//     },
//     onError: (error) => {
//       handleErrors(error);
//     },
//   });
// };

import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/store/authSlice";
import { serviceType } from "../baseUrl";
import { toast } from "sonner";

interface LoginPayload {
  username: string;
  password: string;
  device_name: string;
}

interface LoginResponse {
  data: {
    token: string;
    user: any;
  };
}

const base = axios.create({
  baseURL: serviceType,
});

// const handleErrors = (err: AxiosError) => {
//   const response = err.response;
//   switch (response?.status) {
//     case 500:
//       toast.error(response.data?.message || "Server error");
//       break;

//     case 400:
//     case 401:
//     case 404:
//     case 403:
//     case 422:
//       if (response?.data?.errors) {
//         const errors = response.data.errors;
//         if (Array.isArray(errors)) {
//           errors.forEach((each: any) => {
//             toast.error(each.message);
//           });
//         } else if (typeof errors === "object") {
//           Object.keys(errors).forEach((field) => {
//             errors[field].forEach((errorMessage: string) => {
//               toast.error(errorMessage);
//             });
//           });
//         }
//       } else if (response?.data?.error) {
//         toast.error(response.data.error);
//       } else {
//         toast.error(response?.data?.message || "An error occurred");
//       }
//       break;

//     default:
//       toast.error(err.message || "An unexpected error occurred");
//       break;
//   }
// };

const handleErrors = (err: any) => {
  const response = err.response;
  switch (response?.status) {
    case 500:
      toast.error(response.data.message);
      break;

    case 400:
    case 401:
    case 404:
    case 403:
    case 422:
      if (response.data.errors) {
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach((each: any) => {
            toast.error(each.message);
          });
        } else if (typeof response.data.errors === "object") {
          if (response.data.errors.length > 0) {
            Object.keys(response.data.errors).forEach((field) => {
              const errors = response.data.errors[field];
              errors.forEach((errorMessage: any) => {
                toast.error(errorMessage);
              });
            });
          } else {
            toast.error(response.data.errors.message);
          }
        }
      } else if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.error(response.data.message);
      }
      break;

    default:
      toast.error(err.message);
      break;
  }
};

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await base.post<LoginResponse>(`/api/v1/login`, payload, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
  return data;
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();

  return useMutation<LoginResponse, AxiosError, LoginPayload>(loginUser, {
    onSuccess: (data) => {
      dispatch(setToken(data.data.token));
      dispatch(setUser(data.data.user));
    },
    onError: (error) => {
      handleErrors(error);
    },
  });
};
