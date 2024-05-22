export interface ISubMenu {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  menuId: number;
  name: string;
  route: string;
  icon: string;
  position: number;
}

export interface ISubMenuResponse {
  data: ISubMenu;
  message: string;
}

export interface ISubMenuPaginatedResponse {
  data: ISubMenu[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
