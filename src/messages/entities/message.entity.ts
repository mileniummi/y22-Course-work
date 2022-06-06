import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { Chat } from "./chat.entity";

@Entity()
export class Message {
  @ApiProperty({ example: 1, description: "Unique id of chat" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Hello Word", description: "text of message" })
  @Column()
  text: string;

  @ApiProperty({
    example: new Date(2017, 4, 4, 17, 23, 42, 11),
    description: "Creation date",
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: User })
  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ApiProperty({ type: Chat })
  @ManyToOne(() => Chat, (chat) => chat.id)
  chat: Chat;
}
