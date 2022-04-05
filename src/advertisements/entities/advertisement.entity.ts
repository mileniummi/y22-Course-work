import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export enum Currency {
  DOLLAR = "dollar",
  RUBLE = "ruble",
  LEI = "MDL",
}

export enum DealType {
  RENT = "rent",
  SELL = "sell",
}

export enum DealObject {
  FLAT = "flat",
  HOUSE = "house",
}

@Entity()
export class Advertisement {
  @ApiProperty({ example: 1, description: "Id of advertisement" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: true,
    description: "Shows is advertisement active or not",
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example: "Nice flat near the center for low price...",
    description: "Description of advertisement",
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 250,
    description: "Total floor area of flat or house",
  })
  @Column({ type: "float" })
  area: number;

  @ApiProperty({ example: 25000000, description: "Price of advertisement" })
  @Column({ type: "float" })
  price: number;

  @ApiProperty({
    example: "Kronverskiy ave, 49",
    description: "Address of flat or house",
  })
  @Column()
  location: string;

  @ApiProperty({ example: 2.8, description: "Height of ceiling" })
  @Column({ type: "float" })
  ceilingHeight: number;

  @ApiProperty({ example: 5, description: "Amount of rooms" })
  @Column()
  roomCount: number;

  @ApiProperty({
    example: 9,
    description: "Number of the floor on which flat is located",
  })
  @Column()
  floorNumber: number;

  @ApiProperty({
    example: 13,
    description: "Number of all floors in the house",
  })
  @Column()
  totalFloorNumber: number;

  @ApiProperty({ example: 2017, description: "Year when the house was build" })
  @Column()
  yearOfBuilding: number;

  @ApiProperty({
    example: 35,
    description: "Area of a kitchen in the flat or house in square meters",
  })
  @Column()
  kitchenArea: number;

  @ApiProperty({
    example: 250,
    description: "Living are of flat or house in square meters",
  })
  @Column()
  livingArea: number;

  @ApiProperty({
    example: 59.57,
    description: "Latitude of object location",
  })
  @Column({ type: "float" })
  latitude: number;

  @ApiProperty({
    example: 30.19,
    description: "Longitude of object location",
  })
  @Column({ type: "float" })
  longitude: number;

  @ApiProperty({
    example: true,
    description:
      "Shows if person ready or not to show his flat or house online",
  })
  @Column()
  readyToShowOnline: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if the price is final or customer can bargain",
  })
  @Column()
  isFinalPrice: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if selling object has furniture or not",
  })
  @Column()
  hasFurniture: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if object needs renovation or not",
  })
  @Column()
  needsRenovation: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if object is sold by owner or estate agent",
  })
  @Column()
  fromOwner: boolean;

  @ApiProperty({
    example: "+7 (911) 100-20-20",
    description: "phone number of object owner",
  })
  @Column()
  contactNumber: string;

  @ApiProperty({
    example: DealObject.FLAT,
    description: "Object of selling is flat or house",
  })
  @Column({ type: "enum", enum: DealObject })
  dealObject: DealObject;

  @ApiProperty({
    example: DealType.SELL,
    description: "Type of deal is to sell or rent",
  })
  @Column({ type: "enum", enum: DealType })
  dealType: DealType;

  @ApiProperty({
    example: Currency.RUBLE,
    description: "Currency in which the sale is carried out",
  })
  @Column({ type: "enum", enum: Currency, default: Currency.RUBLE })
  currency: Currency;

  @ApiProperty({
    example: "Gorkovskaya",
    description: "Name of the nearest metro station",
  })
  @Column({ nullable: true })
  metroStation: string;

  @ApiProperty({
    example: "250000",
    description: "Price per square meter",
  })
  @Column({ type: "float", nullable: true })
  pricePerMeter: number;

  @ApiProperty({
    example: new Date(2017, 4, 4, 17, 23, 42, 11),
    description: "Creation date",
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: new User(),
    description: "User who owns this advertisement",
  })
  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ApiProperty({
    example: [
      "https://home-hunter-images.storage.yandexcloud.net/advertisements/lol.png",
    ],
    description: "Array with links of object images",
  })
  @Column("text", { array: true })
  images: string[];
}
