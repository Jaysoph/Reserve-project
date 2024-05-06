import { ISignInHeader, IStudentData } from "../interface/auth";
import services from "./axiosConfig";

export const signin = (data: ISignInHeader) =>
  // Async
  new Promise<IStudentData>((resolve, reject) => {
    return services
      .post<IStudentData>("login", data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
