import {
  Currency,
  DealObject,
  DealType,
} from "../entities/advertisement.entity";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class SearchAdvertisementDto {
  @IsEnum(DealType)
  readonly dealType: string;
  @IsEnum(DealObject)
  readonly dealObject: string;
  @IsNumber()
  readonly roomCount: number;
  @IsNumber()
  readonly smallestPrice: number;
  @IsNumber()
  readonly biggestPrice: number;
  @IsEnum(Currency)
  readonly currency: Currency;
  @IsString()
  readonly address: string;
}
