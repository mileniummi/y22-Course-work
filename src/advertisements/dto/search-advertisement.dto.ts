import { Currency } from "../entities/advertisement.entity";

export class SearchAdvertisementDto {
  readonly dealType: string;
  readonly dealObject: string;
  readonly roomCount: number;
  readonly smallestPrice: number;
  readonly biggestPrice: number;
  readonly currency: Currency;
  readonly address: string;
}
