import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SubMenu } from '../sub_menu/sub_menu.entity';
import { AccessUser } from '../access_user/access_user.entity';
import { AccessRol } from '../access_rol/access_rol.entity';

@Entity({ schema: 'systems', name: 'menu' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'route_back', type: 'varchar' })
  route_back: string;

  @Column({ name: 'route_front', type: 'varchar' })
  route_front: string;

  @Column({ name: 'icon', type: 'varchar' })
  icon: string;

  @Column({ name: 'position', type: 'int' })
  position: number;

  @OneToMany(() => SubMenu, (subMenu) => subMenu.menu)
  subMenus: SubMenu[];

  @OneToMany(() => AccessUser, (accessUser) => accessUser.menu)
  accessUsers: AccessUser[];

  @OneToMany(() => AccessRol, (accessRol) => accessRol.menu)
  accessRoles: AccessRol[];
}
