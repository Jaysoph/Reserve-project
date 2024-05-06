import { IRoomDetailData } from "../interface/detail";
import services from "./axiosConfig";

export const getDetail = () =>
  new Promise<IRoomDetailData[]>((resolve, reject) => {
    return services
      .get<IRoomDetailData[]>(`room/building/24`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
