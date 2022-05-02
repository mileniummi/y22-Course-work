import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "../entities/chat.entity";
import { Message } from "../entities/message.entity";
import { AdvertisementsService } from "../../advertisements/advertisements.service";
import { ChatService } from "./chat.service";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private chatService: ChatService,
    private advertisementsService: AdvertisementsService
  ) {}

  async addMessageToChat(user, advId, chatMessageText: string) {
    const adv = await this.advertisementsService.getWithAuthor(advId);
    let dbChat = await this.chatService.getOne(advId);
    if (!dbChat) {
      console.log("no chat found");
      //  creating chat
      dbChat = await this.chatService.create(user, adv.author);
    }
    return await this.create(chatMessageText, dbChat, user);
  }

  async create(chatMessageText: string, chat: Chat, author: User) {
    return await this.messageRepository.save({ text: chatMessageText, chat, author });
  }

  async addChat(advId: number, user: User) {
    const adv = await this.advertisementsService.getWithAuthor(advId);
    let dbChat = await this.chatService.getOne(user.id);
    if (!dbChat) {
      dbChat = await this.chatService.create(user, adv.author);
    }
    return dbChat;
  }
}
