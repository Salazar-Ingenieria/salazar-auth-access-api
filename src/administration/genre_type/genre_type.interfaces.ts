export interface IGenreType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  name: string;
  description: string | null;
}

export interface IGenreTypeResponse {
  data: IGenreType;
  message: string;
}

export interface IGenreTypePaginatedResponse {
  data: IGenreType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
