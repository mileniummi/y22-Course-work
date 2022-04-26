import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket } from "socket.io";

@WebSocketGateway()
export class MessagesGateway implements OnGatewayInit {
  private logger: Logger = new Logger("MessagesGateway");

  afterInit(server: any): any {
    this.logger.log("Initialized!");
  }

  @SubscribeMessage("message")
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {
      event: "msgToClient",
      data: text,
    };
  }
}
