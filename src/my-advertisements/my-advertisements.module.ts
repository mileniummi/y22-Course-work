import { Module } from "@nestjs/common";
import { MyAdvertisementsController } from "./my-advertisements.controller";

@Module({
  controllers: [MyAdvertisementsController],
})
export class MyAdvertisementsModule {}
