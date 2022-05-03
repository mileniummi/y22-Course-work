import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { MessagesService } from "./services/messages.service";
import { ChatService } from "./services/chat.service";
import { UserService } from "../user/user.service";

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit {
  constructor(
    private messagesService: MessagesService,
    private chatService: ChatService,
    private userService: UserService
  ) {}
  private logger: Logger = new Logger("MessagesGateway");

  @WebSocketServer() wss: Server;

  afterInit(server: any): any {
    this.logger.log("Initialized!");
  }

  @SubscribeMessage("msgToServer")
  async saveMessage(client: Socket, message): Promise<void> {
    const author = await this.userService.findOne(message.author);
    const chat = await this.chatService.getOneById(message.chatId);
    const response = await this.messagesService.create(message.text, chat, author);
    this.wss.emit("msgToClient", response);
  }

  @SubscribeMessage("getChatMessages")
  async initChat(client: Socket, message) {
    const chat = await this.chatService.getOneById(message.chatId);
    const chatMessages = await this.messagesService.getAll(message.chatId);
    return { event: "chatToClient", data: { messages: chatMessages, users: chat.users } };
  }
}
