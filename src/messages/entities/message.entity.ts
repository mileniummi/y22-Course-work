import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
  @ApiProperty({ example: 1, description: "Unique id of chat" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Hello Word", description: "" })
  text: string;

  @ApiProperty({ type: [User] })
  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ApiProperty({ type: [Chat] })
  @ManyToOne(() => Chat, (chat) => chat.id)
  chat: Chat;
}
