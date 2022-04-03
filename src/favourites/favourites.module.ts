import { Module } from "@nestjs/common";
import { FavouritesController } from "./favourites.controller";

@Module({
  controllers: [FavouritesController],
})
export class FavouritesModule {}
