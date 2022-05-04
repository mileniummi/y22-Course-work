import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./services/messages.service";
import { ChatService } from "./services/chat.service";
import { UserService } from "../user/user.service";

@WebSocketGateway()
export class MessagesGateway {
  constructor(
    private messagesService: MessagesService,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage("msgToServer")
  async saveMessage(client: Socket, message): Promise<void> {
    const author = await this.userService.findOne(message.author);
    const chat = await this.chatService.getOneById(message.room);
    const response = await this.messagesService.create(message.text, chat, author);
    this.wss.to(message.room).emit("msgToClient", response);
  }

  @SubscribeMessage("getChatMessages")
  async initChat(client: Socket, message) {
    const chat = await this.chatService.getOneById(message.chatId);
    const chatMessages = await this.messagesService.getAll(message.chatId);
    return { event: "chatToClient", data: { messages: chatMessages, users: chat.users } };
  }

  @SubscribeMessage("joinRoom")
  async handleJoinRoom(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
  }
}
