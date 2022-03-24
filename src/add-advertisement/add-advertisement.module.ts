import { Module } from "@nestjs/common";
import { AddAdvertisementController } from "./add-advertisement.controller";
import { AddAdvertisementService } from "./add-advertisement.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { databaseImage } from "../advertisements/entities/databaseImage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement, databaseImage])],
  controllers: [AddAdvertisementController],
  providers: [AddAdvertisementService],
})
export class AddAdvertisementModule {}
