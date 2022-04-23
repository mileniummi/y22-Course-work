import { Module } from "@nestjs/common";
import { FavouritesController } from "./favourites.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [FavouritesController],
})
export class FavouritesModule {}
