import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { NewMessageDto } from './dtos/new-message.dto';

@WebSocketGateway({ cors: true })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesService: MessagesService) {}

  async handleConnection(client: Socket) {
    await this.messagesService.registerClient(client);
    this.wss.emit('connected-clients', this.messagesService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    this.messagesService.removeClient(client.id);
    this.wss.emit('connected-clients', this.messagesService.getConnectedClients());
  }

  @SubscribeMessage('message-from-client')
  messageFromClient(client: Socket, payload: NewMessageDto) {
    // Notificar al mismo cliente
    /* client.emit('message-from-server', {
      fullName: 'Soy YO!!',
      message: payload.message
    }); */
    // Notificar a todos excepto el cliente
    /* client.broadcast.emit('message-from-server', {
      fullName: 'Soy YO!!',
      message: payload.message
    }); */
    // Notificar a todos los clientes
    this.wss.emit('message-from-server', {
      fullName: this.messagesService.getUserFullNameBySocketId(client.id),
      message: payload.message
    });
  }
}
