import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Message } from "./message.entity";

@Entity()
export class Chat {
  @ApiProperty({ example: 1, description: "Unique id of chat" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [User] })
  @ManyToMany(() => User, (user) => user.chats)
  users: User[];

  @ApiProperty({ type: [Message] })
  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
