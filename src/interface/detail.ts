import { IStudentData } from "./auth";

export interface IRoomDetailData {
  roomId: number;
  roomNumber: number;
  building: number;
  floor: number;
  capacity: number;
  facilities: string;
  imgUrl: string;
}

export interface IgetRoombyNumber {
  id: number;
  timestamp: Date;
  date: string;
  startTime: number;
  endTime: number;
  status: boolean;
  // select all except ----------V
  students: Omit<IStudentData, "token">;
  rooms: IRoomDetailData;
}
