import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  description: string;

  @Column()
  area: number;

  @Column()
  price: string;

  @Column()
  location: number;

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

  @Column()
  latitude: number;

  @Column()
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

  @Column()
  photos: Array<string>;

  @Column()
  currency: string;

  @Column()
  metroStation;

  @Column()
  pricePerMeter: string;

  @CreateDateColumn()
  createdAt: Date;
}
