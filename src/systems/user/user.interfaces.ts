export interface IUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  personId: number;
  rolId: number;
  email: string;
}

export interface IUserResponse {
  data: IUser;
  message: string;
}

export interface IUserPaginatedResponse {
  data: IUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
