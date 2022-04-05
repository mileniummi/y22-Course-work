import {
  Currency,
  DealType,
  DealObject,
} from "../entities/advertisement.entity";

export class CreateAdvertisementDto {
  readonly description: string;
  readonly area: number;
  readonly price: number;
  readonly location: string;
  readonly ceilingHeight: number;
  readonly roomCount: number;
  readonly floorNumber: number;
  readonly totalFloorNumber: number;
  readonly yearOfBuilding: number;
  readonly kitchenArea: number;
  readonly livingArea: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly readyToShowOnline: boolean;
  readonly isFinalPrice: boolean;
  readonly hasFurniture: boolean;
  readonly needsRenovation: boolean;
  readonly fromOwner: boolean;
  readonly contactNumber: string;
  readonly dealObject: DealObject;
  readonly dealType: DealType;
  readonly currency: Currency;
  readonly createdAt: Date;
}