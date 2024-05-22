export interface IDepartment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  name: string;
  countryId: number;
}

export interface IDepartmentResponse {
  data: IDepartment;
  message: string;
}

export interface IDepartmentPaginatedResponse {
  data: IDepartment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
