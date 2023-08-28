import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage, WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger, UseInterceptors } from "@nestjs/common";
import { Namespace, Server, Socket } from "socket.io";
import { CacheInterceptor } from "@nestjs/cache-manager";

interface IWebSocketPayload {
  data: string,
}

@WebSocketGateway({
  namespace: 'marka-challenge',
})
export class MainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}

  private logger: Logger = new Logger(MainGateway.name);

  // @WebSocketServer() wss: Server;
  @WebSocketServer() io: Namespace;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `from ${client.id}`);
    // client.emit('some-connected', `Client connected (ID =  ${client.id})`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }

  // @CacheKey('sendMessage')
  @UseInterceptors(CacheInterceptor)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: IWebSocketPayload): Promise<void> {
    console.log(payload.data);
    client.emit('receiveMessage', { ...payload, newField: 'This is the same message echoed back'});
  }

}

