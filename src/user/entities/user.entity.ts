import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Advertisement } from "../../advertisements/entities/advertisement.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Chat } from "../../messages/entities/chat.entity";
import { Message } from "../../messages/entities/message.entity";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class User {
  @ApiProperty({ example: 1, description: "Unique id of user" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "cat", description: "Username of user" })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: "Nikolay", description: "Name of user" })
  @Column()
  firstName: string;

  @ApiProperty({ example: "Andreev", description: "Surname of user" })
  @Column()
  lastName: string;

  @ApiProperty({ example: "querty123", description: "Password of user" })
  @Column()
  password: string;

  @ApiProperty({ example: true, description: "Is user blocked or not" })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    example: [Advertisement],
    description: "All user advertisements",
  })
  @OneToMany(() => Advertisement, (adv) => adv.author)
  advertisements: Advertisement[];

  @ApiProperty({
    description: "All favourite advertisements list",
  })
  @ManyToMany(() => Advertisement)
  @JoinTable()
  favAdvs: Advertisement[];

  @ApiProperty({
    example: [Advertisement],
    description: "All user advertisements",
  })
  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats: Chat[];
}
