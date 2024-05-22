import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../systems/user/user.entity';
import { City } from '../../location/city/city.entity';
import { Department } from '../../location/department/department.entity';

@Entity({ schema: 'administration', name: 'person' })
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'middle_name', type: 'varchar', nullable: true })
  middleName?: string;

  @Column({ name: 'first_surname', type: 'varchar' })
  firstSurname: string;

  @Column({ name: 'second_surname', type: 'varchar', nullable: true })
  secondSurname?: string;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'genre_type_id', type: 'int' })
  genreTypeId: number;

  @Index('idx_person_identification_type')
  @Column({ name: 'identification_type_id', type: 'int' })
  identificationTypeId: number;

  @Column({ name: 'identification', type: 'varchar', unique: true })
  identification: string;

  @Column({ name: 'avatar', type: 'varchar' })
  avatar: string;

  @Column({ name: 'phone', type: 'varchar' })
  phone: string;

  @Index('idx_person_department')
  @Column({ name: 'department_id', type: 'int' })
  departmentId: number;

  @Index('idx_person_city')
  @Column({ name: 'city_id', type: 'int' })
  cityId: number;

  @Column({ name: 'address', type: 'varchar' })
  address: string;

  @OneToOne(() => User, (user) => user.person)
  user: User;

  @ManyToOne(() => City, (city) => city.person)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => Department, (department) => department.person)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
