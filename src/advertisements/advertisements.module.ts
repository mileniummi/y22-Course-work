import { forwardRef, Module } from "@nestjs/common";
import { AdvertisementsController } from "./advertisements.controller";
import { AdvertisementsService } from "./advertisements.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { YandexStorageService } from "./yandex.storage.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWT_MODULE_OPTIONS } from "@nestjs/jwt/dist/jwt.constants";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement]), AuthModule],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService, YandexStorageService],
})
export class AdvertisementsModule {}
