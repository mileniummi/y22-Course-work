import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { ImagesLink } from "./images-link.entity";

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

  @OneToOne(() => ImagesLink)
  @JoinColumn()
  images: ImagesLink;

  @Column()
  currency: string;

  @Column()
  metroStation: string;

  @Column()
  pricePerMeter: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  author: User;
}
