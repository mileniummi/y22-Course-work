import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./services/messages.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Chat } from "./entities/chat.entity";
import { AdvertisementsService } from "../advertisements/advertisements.service";
import { YandexStorageService } from "../advertisements/yandex.storage.service";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { AuthModule } from "../auth/auth.module";
import { ChatService } from "./services/chat.service";
import { MessagesGateway } from "./messager.gateway";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Chat, Message, Advertisement, User])],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway, ChatService, UserService, AdvertisementsService, YandexStorageService],
})
export class MessagesModule {}
