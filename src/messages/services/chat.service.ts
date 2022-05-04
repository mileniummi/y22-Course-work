import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "../entities/chat.entity";
import { User } from "../../user/entities/user.entity";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>
  ) {}

  async getOneById(id: number) {
    return await this.chatRepository.findOne({ where: { id }, relations: ["users"] });
  }

  async create(initiator: User, interlocutor: User) {
    if (initiator.id === interlocutor.id) {
      //  Офигевший сам с собой общатся хочет
      throw new ConflictException();
    }
    return await this.chatRepository.save({ users: [initiator, interlocutor] });
  }
}
