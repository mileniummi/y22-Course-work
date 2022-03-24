import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Advertisement } from "./advertisement.entity";

@Entity()
export class databaseImage {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column({
    type: "bytea",
  })
  data: Uint8Array;

  @ManyToOne(() => Advertisement, (adv) => adv.images)
  advertisement: Advertisement;
}
