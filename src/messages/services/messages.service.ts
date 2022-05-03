import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "../entities/chat.entity";
import { Message } from "../entities/message.entity";
import { AdvertisementsService } from "../../advertisements/advertisements.service";
import { ChatService } from "./chat.service";
import { User } from "../../user/entities/user.entity";
import { UserService } from "../../user/user.service";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private chatService: ChatService,
    private advertisementsService: AdvertisementsService,
    private userService: UserService
  ) {}

  async getAllChats(user: User) {
    const { chats } = await this.userService.getAllChats(user.id);
    return {
      chats: chats.map((chat) => {
        let interlocutor;
        chat.users.forEach((chatUser) => {
          if (chatUser.id !== user.id) {
            interlocutor = chatUser;
          }
        });
        const rndInt = Math.floor(Math.random() * 9) + 1;
        return { id: chat.id, interlocutor, icon: `/images/chat-icons/${rndInt}.jpg` };
      }),
    };
  }

  async create(chatMessageText: string, chat: Chat, author) {
    return await this.messageRepository.save({ text: chatMessageText, chat, author });
  }

  async getAll(chatId: number) {
    return await this.messageRepository
      .createQueryBuilder("message")
      .leftJoinAndSelect("message.chat", "chat")
      .where("chat.id = :id", { id: chatId })
      .leftJoinAndSelect("message.author", "author")
      .getMany();
  }

  async addChat(advId: number, user: User) {
    const adv = await this.advertisementsService.getWithAuthor(advId);
    let dbChat = (await this.userService.getUserChat(user.id, adv.author.id)).chats[0];
    console.log(dbChat);
    if (!dbChat) {
      console.log("sdfisdfsdi", dbChat);
      dbChat = await this.chatService.create(user, adv.author);
    }
    return dbChat;
  }
}
