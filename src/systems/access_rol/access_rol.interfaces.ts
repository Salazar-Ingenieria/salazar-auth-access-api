export interface IAccessRol {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  rolId: number;
  menuId: number;
}

export interface IAccessRolResponse {
  data: IAccessRol;
  message: string;
}

export interface IAccessRolPaginatedResponse {
  data: IAccessRol[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
