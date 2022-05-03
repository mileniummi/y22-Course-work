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

  async getOne(userId: number) {
    return await this.chatRepository
      .createQueryBuilder("chat")
      .leftJoinAndSelect("chat.users", "user")
      .where("user.id = :id", { id: userId })
      .getOne();
  }

  async getOneById(id: number) {
    return await this.chatRepository.findOne({ where: { id }, relations: ["users"] });
  }

  async getAllUserChats(userId: number) {
    return await this.chatRepository
      .createQueryBuilder("chat")
      .leftJoinAndSelect("chat.users", "user", "user.id = :id", { id: userId })
      .getMany();
  }

  async create(initiator: User, interlocutor: User) {
    if (initiator.id === interlocutor.id) {
      //  Офигевший сам с собой общатся хочет
      throw new ConflictException();
    }
    return await this.chatRepository.save({ users: [initiator, interlocutor] });
  }
}
