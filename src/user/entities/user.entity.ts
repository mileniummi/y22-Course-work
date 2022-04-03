import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Advertisement } from "../../advertisements/entities/advertisement.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Advertisement, (adv) => adv.author)
  advertisements: Advertisement[];
}
