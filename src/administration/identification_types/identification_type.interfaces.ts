export interface IIdentificationType {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  name: string;
  description: string | null;
}

export interface IIdentificationTypeResponse {
  data: IIdentificationType;
  message: string;
}

export interface IIdentificationTypePaginatedResponse {
  data: IIdentificationType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
