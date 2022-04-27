import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Chat } from "./entities/chat.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
