import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ImagesLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  advId: number;

  @Column({ unique: true })
  linkToFolder: string;
}
