
import { IgetRoombyNumber } from "../interface/detail";
import services from "./axiosConfig";

export const getTimeTablebyRoomId = (id:number) =>
  new Promise<IgetRoombyNumber[]>((resolve, reject) => {
    return (
      services
      .get<IgetRoombyNumber[]>(`booking/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error))
    );
  });

