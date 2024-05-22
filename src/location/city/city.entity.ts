import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Person } from '../../administration/person/person.entity';

@Entity({ schema: 'location', name: 'city' })
export class City {
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

  @Index('idx_city_department')
  @Column({ name: 'department_id', type: 'int', nullable: false })
  departmentId: number;

  @ManyToOne(() => Department, (department) => department.cities)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToOne(() => Person, (person) => person.city)
  person: Person;
}
