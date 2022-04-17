import {
  Currency,
  DealObject,
  DealType,
} from "../entities/advertisement.entity";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class SearchAdvertisementDto {
  @IsEnum(DealType)
  @IsOptional()
  readonly dealType?: string;

  @IsEnum(DealObject)
  @IsOptional()
  readonly dealObject?: string;

  @IsNumber()
  @IsOptional()
  @Transform((prop) => parseInt(prop.value), { toClassOnly: true })
  readonly roomCount?: number;

  @IsNumber()
  @IsOptional()
  @Transform((prop) => (prop.value ? parseFloat(prop.value) : null), {
    toClassOnly: true,
  })
  readonly smallestPrice?: number;

  @IsNumber()
  @IsOptional()
  @Transform((prop) => (prop.value ? parseFloat(prop.value) : null), {
    toClassOnly: true,
  })
  readonly biggestPrice?: number;

  @IsEnum(Currency)
  @IsOptional()
  readonly currency?: Currency;

  @IsString()
  @IsOptional()
  readonly address?: string;
}
