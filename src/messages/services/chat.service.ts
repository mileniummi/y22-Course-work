import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "../entities/chat.entity";
import { User } from "../../user/entities/user.entity";
import { Advertisement } from "../../advertisements/entities/advertisement.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>
  ) {}
  async getOne(advId: number, userId: number) {
    return await this.chatRepository
      .createQueryBuilder("chat")
      .leftJoinAndSelect("chat.advertisement", "adv")
      .where("adv.id = :id", { id: advId })
      .leftJoinAndSelect("chat.users", "user")
      .where("user.id = :id", { id: userId })
      .getOne();
  }
  async create(initiator: User, interlocutor: User, advertisement: Advertisement) {
    if (initiator.id === interlocutor.id) {
      //  Офигевший сам с собой общатся хочет
      throw new ConflictException();
    }
    return await this.chatRepository.save({ users: [initiator, interlocutor], advertisement });
  }
}
