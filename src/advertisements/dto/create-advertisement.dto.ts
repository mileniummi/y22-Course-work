import {
  Currency,
  DealType,
  DealObject,
} from "../entities/advertisement.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdvertisementDto {
  @ApiProperty({
    example: "Nice flat near the center for low price...",
    description: "Description of advertisement",
  })
  readonly description: string;
  @ApiProperty({
    example: 250,
    description: "Total floor area of flat or house",
  })
  readonly area: number;
  @ApiProperty({ example: 25000000, description: "Price of advertisement" })
  readonly price: number;
  @ApiProperty({
    example: "Kronverskiy ave, 49",
    description: "Address of flat or house",
  })
  readonly location: string;
  @ApiProperty({ example: 2.8, description: "Height of ceiling" })
  readonly ceilingHeight: number;
  @ApiProperty({ example: 5, description: "Amount of rooms" })
  readonly roomCount: number;
  @ApiProperty({
    example: 9,
    description: "Number of the floor on which flat is located",
  })
  readonly floorNumber: number;
  @ApiProperty({
    example: 13,
    description: "Number of all floors in the house",
  })
  readonly totalFloorNumber: number;
  @ApiProperty({ example: 2017, description: "Year when the house was build" })
  readonly yearOfBuilding: number;
  @ApiProperty({
    example: 35,
    description: "Area of a kitchen in the flat or house in square meters",
  })
  readonly kitchenArea: number;
  @ApiProperty({
    example: 250,
    description: "Living are of flat or house in square meters",
  })
  readonly livingArea: number;
  @ApiProperty({
    example: 59.57,
    description: "Latitude of object location",
  })
  readonly latitude: number;
  @ApiProperty({
    example: 30.19,
    description: "Longitude of object location",
  })
  readonly longitude: number;
  @ApiProperty({
    example: true,
    description:
      "Shows if person ready or not to show his flat or house online",
  })
  readonly readyToShowOnline: boolean;
  @ApiProperty({
    example: true,
    description: "Shows if the price is final or customer can bargain",
  })
  readonly isFinalPrice: boolean;
  @ApiProperty({
    example: true,
    description: "Shows if selling object has furniture or not",
  })
  readonly hasFurniture: boolean;
  @ApiProperty({
    example: true,
    description: "Shows if object needs renovation or not",
  })
  readonly needsRenovation: boolean;
  @ApiProperty({
    example: true,
    description: "Shows if object is sold by owner or estate agent",
  })
  readonly fromOwner: boolean;
  @ApiProperty({
    example: "+7 (911) 100-20-20",
    description: "phone number of object owner",
  })
  readonly contactNumber: string;
  @ApiProperty({
    example: DealObject.FLAT,
    description: "Object of selling is flat or house",
  })
  readonly dealObject: DealObject;
  @ApiProperty({
    example: DealType.SELL,
    description: "Type of deal is to sell or rent",
  })
  readonly dealType: DealType;
  @ApiProperty({
    example: Currency.RUBLE,
    description: "Currency in which the sale is carried out",
  })
  readonly currency: Currency;
}
