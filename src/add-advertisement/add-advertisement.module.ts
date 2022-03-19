import { Module } from "@nestjs/common";
import { AddAdvertisementController } from "./add-advertisement.controller";

@Module({
  controllers: [AddAdvertisementController],
})
export class AddAdvertisementModule {}
