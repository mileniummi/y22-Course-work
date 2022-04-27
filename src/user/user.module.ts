import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AdvertisementsModule } from "../advertisements/advertisements.module";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { AdvertisementsService } from "../advertisements/advertisements.service";
import { YandexStorageService } from "../advertisements/yandex.storage.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Advertisement])],
  providers: [UserService, AdvertisementsService, YandexStorageService],
  exports: [UserService],
})
export class UserModule {}
