// export interface Ticket {
//   _id: string;
//   title: string;
//   body: string;
//   department: string;
//   subDepartment: string;
//   priority: number;
//   user: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   isAnswer: boolean;
//   adminAnswer: string;
// }

export interface Tickets {
  _id: string;
  title: string;
  body: string;
  department: {
    _id: string;
    title: string;
  };
  subDepartment: {
    _id: string;
    title: string;
  };
  priority: number;
  user: string;
  status: string;
  adminAnswer?: string;
  isAnswer: boolean;
  createdAt: Date;
  updatedAt: Date;
  answeredAt?: Date;
  answeredBy?: {
    _id: string;
    name: string;
    role: string;
  };
}
