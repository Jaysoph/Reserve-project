export interface ISignInHeader {
  username: string;
  password: string;
}

export interface IStudentData {
  studentId: number;
  studentNumber: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  faculty: string;
  major: string;
  roles: string[];
  permission: string[];
  token: string;
}
