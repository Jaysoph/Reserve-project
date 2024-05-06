export interface ISaveBookingData {
  studentNumber: string;
  startTime: string;
  endTime: string;
  date: string;
  roomNumber: number;
}

export interface ISaveBookingResponse {
  date: string;
  startTime: string;
  endTime: string;
  status: boolean;
  roomNumber: number;
  msg: string;
}
