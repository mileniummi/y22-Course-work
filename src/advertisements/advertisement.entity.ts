import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: string;
}
