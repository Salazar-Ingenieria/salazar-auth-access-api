import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Country } from '../country/country.entity';
import { City } from '../city/city.entity';
import { Person } from '../../administration/person/person.entity';

@Entity({ schema: 'location', name: 'department' })
export class Department {
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

  @Index('idx_department_country')
  @Column({ name: 'country_id', type: 'int', nullable: false })
  countryId: number;

  @ManyToOne(() => Country, (country) => country.departments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => City, (city) => city.department)
  cities: City[];

  @OneToOne(() => Person, (person) => person.city)
  person: Person;
}
