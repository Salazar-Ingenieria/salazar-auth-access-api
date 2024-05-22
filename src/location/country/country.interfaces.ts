export interface ICountry {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  name: string;
}

export interface ICountryResponse {
  data: ICountry;
  message: string;
}

export interface ICountryPaginatedResponse {
  data: ICountry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
