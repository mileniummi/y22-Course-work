import {
  Currency,
  DealType,
  DealObject,
} from "../entities/advertisement.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsString, IsBoolean, IsEnum } from "class-validator";

export class CreateAdvertisementDto {
  @ApiProperty({
    example: "Nice flat near the center for low price...",
    description: "Description of advertisement",
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: 250,
    description: "Total floor area of flat or house",
  })
  @Transform((prop) => parseFloat(prop.value), { toClassOnly: true })
  @IsNumber()
  readonly area: number;

  @ApiProperty({ example: 25000000, description: "Price of advertisement" })
  @IsNumber()
  @Transform((prop) => parseFloat(prop.value), { toClassOnly: true })
  readonly price: number;

  @ApiProperty({
    example: "Kronverskiy ave, 49",
    description: "Address of flat or house",
  })
  @IsString()
  readonly location: string;

  @ApiProperty({ example: 2.8, description: "Height of ceiling" })
  @IsNumber()
  @Transform((prop) => parseFloat(prop.value), { toClassOnly: true })
  readonly ceilingHeight: number;

  @ApiProperty({ example: 5, description: "Amount of rooms" })
  @IsNumber()
  @Transform((prop) => parseInt(prop.value), { toClassOnly: true })
  readonly roomCount: number;

  @ApiProperty({
    example: 9,
    description: "Number of the floor on which flat is located",
  })
  @IsNumber()
  @Transform((prop) => parseInt(prop.value), { toClassOnly: true })
  readonly floorNumber?: number;

  @ApiProperty({
    example: 13,
    description: "Number of all floors in the house",
  })
  @IsNumber()
  @Transform((prop) => parseInt(prop.value), { toClassOnly: true })
  readonly totalFloorNumber: number;

  @ApiProperty({ example: 2017, description: "Year when the house was build" })
  @IsNumber()
  @Transform((prop) => parseInt(prop.value), { toClassOnly: true })
  readonly yearOfBuilding: number;

  @ApiProperty({
    example: 35,
    description: "Area of a kitchen in the flat or house in square meters",
  })
  @IsNumber()
  @Transform((prop) => parseInt(prop.value), { toClassOnly: true })
  readonly kitchenArea: number;

  @ApiProperty({
    example: 250,
    description: "Living are of flat or house in square meters",
  })
  @IsNumber()
  @Transform((prop) => parseFloat(prop.value), { toClassOnly: true })
  readonly livingArea: number;

  @ApiProperty({
    example: 59.57,
    description: "Latitude of object location",
  })
  @IsNumber()
  @Transform((prop) => parseFloat(prop.value), { toClassOnly: true })
  readonly latitude: number;

  @ApiProperty({
    example: 30.19,
    description: "Longitude of object location",
  })
  @IsNumber()
  @Transform((prop) => parseFloat(prop.value), { toClassOnly: true })
  readonly longitude: number;

  @ApiProperty({
    example: true,
    description:
      "Shows if person ready or not to show his flat or house online",
  })
  @IsBoolean()
  @Transform((prop) => prop.value === "true", { toClassOnly: true })
  readonly readyToShowOnline: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if the price is final or customer can bargain",
  })
  @IsBoolean()
  @Transform((prop) => prop.value === "true", { toClassOnly: true })
  readonly isFinalPrice: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if selling object has furniture or not",
  })
  @IsBoolean()
  @Transform((prop) => prop.value === "true", { toClassOnly: true })
  readonly hasFurniture: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if object needs renovation or not",
  })
  @IsBoolean()
  @Transform((prop) => prop.value === "true", { toClassOnly: true })
  readonly needsRenovation: boolean;

  @ApiProperty({
    example: true,
    description: "Shows if object is sold by owner or estate agent",
  })
  @IsBoolean()
  @Transform((prop) => prop.value === "true", { toClassOnly: true })
  readonly fromOwner: boolean;

  @ApiProperty({
    example: "+7 (911) 100-20-20",
    description: "phone number of object owner",
  })
  @IsString()
  readonly contactNumber: string;

  @ApiProperty({
    example: DealObject.FLAT,
    description: "Object of selling is flat or house",
  })
  @IsEnum(DealObject)
  readonly dealObject: DealObject;

  @ApiProperty({
    example: DealType.SELL,
    description: "Type of deal is to sell or rent",
  })
  @IsEnum(DealType)
  readonly dealType: DealType;

  @ApiProperty({
    example: Currency.RUBLE,
    description: "Currency in which the sale is carried out",
  })
  @IsEnum(Currency)
  readonly currency: Currency;
}
