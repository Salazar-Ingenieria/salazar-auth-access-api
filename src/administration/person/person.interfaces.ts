export interface IPerson {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  middleName?: string;
  firstSurname: string;
  secondSurname?: string;
  fullName: string;
  genreTypeId: number;
  identificationTypeId: number;
  identification: string;
  avatar: string;
  phone: string;
  departmentId: number;
  cityId: number;
  address: string;
}

export interface IPersonResponse {
  data: IPerson;
  message: string;
}

export interface IPersonPaginatedResponse {
  data: IPerson[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
