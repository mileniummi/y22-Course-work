import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { databaseImage } from "./databaseImage.entity";

export enum Currency {
  DOLLAR = "dollar",
  RUBLE = "ruble",
  LEI = "MDL",
}

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;

  @Column()
  area: number;

  @Column({ type: "float" })
  price: number;

  @Column()
  location: string;

  @Column()
  ceilingHeight: number;

  @Column()
  roomCount: number;

  @Column()
  floorNumber: number;

  @Column()
  totalFloorNumber: number;

  @Column()
  yearOfBuilding: number;

  @Column()
  kitchenArea: number;

  @Column()
  livingArea: number;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @Column()
  readyToShowOnline: boolean;

  @Column()
  isFinalPrice: boolean;

  @Column()
  hasFurniture: boolean;

  @Column()
  needsRenovation: boolean;

  @Column()
  fromOwner: boolean;

  @Column()
  contactNumber: string;

  @Column()
  dealObject: string;

  @OneToMany(() => databaseImage, (image) => image.advertisement)
  images: databaseImage[];

  @Column({ type: "enum", enum: Currency, default: Currency.RUBLE })
  currency: Currency;

  @Column({ nullable: true })
  metroStation: string;

  @Column({ type: "float", nullable: true })
  pricePerMeter: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
