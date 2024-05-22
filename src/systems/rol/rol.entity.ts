import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { AccessRol } from '../access_rol/access_rol.entity';

@Entity({ schema: 'systems', name: 'rol' })
export class Rol {
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

  @OneToMany(() => User, (user) => user.rol)
  users: User[];

  @OneToMany(() => AccessRol, (accessRol) => accessRol.rol)
  accessRoles: AccessRol[];
}
