import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Menu } from '../menu/menu.entity';

@Entity({ schema: 'systems', name: 'access_user' })
@Unique('uq_user_menu', ['userId', 'menuId'])
export class AccessUser {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Index('idx_access_user_user')
  @Column({ name: 'user_id', type: 'int', nullable: false })
  userId: number;

  @Index('idx_access_user_menu')
  @Column({ name: 'menu_id', type: 'int', nullable: false })
  menuId: number;

  @ManyToOne(() => User, (user) => user.accessUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Menu, (menu) => menu.accessUsers)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
}
