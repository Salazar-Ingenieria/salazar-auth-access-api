export interface IRol {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface IRolResponse {
  data: IRol;
  message: string;
}

export interface IRolPaginatedResponse {
  data: IRol[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
