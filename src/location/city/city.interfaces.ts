export interface ICity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  name: string;
  departmentId: number;
}

export interface ICityResponse {
  data: ICity;
  message: string;
}

export interface ICityPaginatedResponse {
  data: ICity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
