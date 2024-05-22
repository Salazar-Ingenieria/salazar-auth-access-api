import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from '../rol/rol.entity';
import { Menu } from '../menu/menu.entity';

@Entity({ schema: 'systems', name: 'access_rol' })
export class AccessRol {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Index('idx_access_rol_rol')
  @Column({ name: 'rol_id', type: 'int' })
  rolId: number;

  @Index('idx_access_rol_menu')
  @Column({ name: 'menu_id', type: 'int' })
  menuId: number;

  @ManyToOne(() => Rol, (rol) => rol.accessRoles)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Menu, (menu) => menu.accessRoles)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
