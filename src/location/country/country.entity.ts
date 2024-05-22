import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Department } from '../department/department.entity';

@Entity({ schema: 'location', name: 'country' })
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Department, (department) => department.country)
  departments: Department[];
}
