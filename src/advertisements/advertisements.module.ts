import { Module } from "@nestjs/common";
import { AdvertisementsController } from "./advertisements.controller";

@Module({
  controllers: [AdvertisementsController],
})
export class AdvertisementsModule {}
