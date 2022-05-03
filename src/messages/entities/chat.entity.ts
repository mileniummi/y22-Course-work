import { Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Message } from "./message.entity";
import { Advertisement } from "../../advertisements/entities/advertisement.entity";

@Entity()
export class Chat {
  @ApiProperty({ example: 1, description: "Unique id of chat" })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}