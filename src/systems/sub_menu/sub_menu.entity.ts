import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Menu } from '../menu/menu.entity';

@Entity({ schema: 'systems', name: 'sub_menu' })
export class SubMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Index('idx_sub_menu_menu')
  @Column({ name: 'menu_id', type: 'int' })
  menuId: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'route', type: 'varchar' })
  route: string;

  @Column({ name: 'icon', type: 'varchar' })
  icon: string;

  @Column({ name: 'position', type: 'int' })
  position: number;

  @ManyToOne(() => Menu, (menu) => menu.subMenus)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
