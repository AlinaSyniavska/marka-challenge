import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage, WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Namespace, Server, Socket } from "socket.io";
import { MainService } from "./main.service";

@WebSocketGateway({
  namespace: 'marka-challenge',
})
export class MainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private mainService: MainService) {}

  private logger: Logger = new Logger(MainGateway.name);

  // @WebSocketServer() wss: Server;
  @WebSocketServer() io: Namespace;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `from ${client.id}`);
    // client.emit('some-connected', `Client connected (ID =  ${client.id})`);
  }

  handleDisconnect(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }


  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: string): Promise<void> {

    console.log('***************');
    console.log(payload);

    // const newMessage = await this.mainService.echoMessage(payload);
    // this.io.emit('receiveMessage', newMessage);
  }

}

