
import { IRoomDetailData } from "../interface/detail";
import services from "./axiosConfig";

export const getRoombyNumber = (roomNumber: number) =>
  new Promise<IRoomDetailData>((resolve, reject) => {
    return (
      services
      .get<IRoomDetailData>(`room/${roomNumber}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
    );
  });

