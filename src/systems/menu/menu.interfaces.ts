export interface IMenu {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  name: string;
  route_back: string;
  route_front: string;
  icon: string;
  position: number;
}

export interface IMenuResponse {
  data: IMenu;
  message: string;
}

export interface IMenuPaginatedResponse {
  data: IMenu[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
