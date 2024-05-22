import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Person } from '../../administration/person/person.entity';
import { Rol } from '../rol/rol.entity';
import { AccessUser } from '../access_user/access_user.entity';

@Entity({ schema: 'systems', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Index('idx_user_person')
  @Column({ name: 'person_id', type: 'int', unique: true })
  personId: number;

  @Index('idx_user_rol')
  @Column({ name: 'rol_id', type: 'int' })
  rolId: number;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @ManyToOne(() => Rol, (rol) => rol.users)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @OneToMany(() => AccessUser, (accessUser) => accessUser.user)
  accessUsers: AccessUser[];
}
