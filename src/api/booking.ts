import { ISaveBookingData, ISaveBookingResponse } from "../interface/booking";
import services from "./axiosConfig";

export const saveBooking = (data: ISaveBookingData) =>
  new Promise<ISaveBookingResponse>((resolve, reject) => {
    return services
      .post<ISaveBookingResponse>("booking", data)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
