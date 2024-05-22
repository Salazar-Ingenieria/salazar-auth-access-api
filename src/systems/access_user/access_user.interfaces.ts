export interface IAccessUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  userId: number;
  menuId: number;
}

export interface IAccessUserResponse {
  data: IAccessUser;
  message: string;
}

export interface IAccessUserPaginatedResponse {
  data: IAccessUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
