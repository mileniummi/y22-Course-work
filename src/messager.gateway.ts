import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit {
  private logger: Logger = new Logger("MessagesGateway");

  @WebSocketServer() wss: Server;

  afterInit(server: any): any {
    this.logger.log("Initialized!");
  }

  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, text: string): void {
    this.wss.emit("msgToClient", text);
    // return {
    //   event: "msgToClient",
    //   data: text,
    // };
  }
}
