export class CreateAdvertisementDto {
  readonly description: string;
  readonly area: number;
  readonly price: number;
  readonly location: number;
  readonly ceilingHeight: number;
  readonly roomCount: number;
  readonly floorNumber: number;
  readonly totalFloorNumber: number;
  readonly yearOfBuilding: number;
  readonly kitchenArea: number;
  readonly livingArea: number;
  readonly coords: number[];
  readonly readyToShowOnline: boolean;
  readonly isFinalPrice: boolean;
  readonly hasFurniture: boolean;
  readonly needsRenovation: boolean;
  readonly fromOwner: boolean;
  readonly contactNumber: string;
  readonly dealObject: string;
  readonly photos: string[];
  readonly selectedPrice;
}
