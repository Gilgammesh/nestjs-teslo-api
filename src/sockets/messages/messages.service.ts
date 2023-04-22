import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ConnectedClients } from './interfaces/connected-clients.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  private connectedClients: ConnectedClients = {};

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async registerClient(client: Socket) {
    if (client.handshake.headers.authentication) {
      const token = client.handshake.headers.authentication as string;
      try {
        const decoded = await this.jwtService.verifyAsync(token);
        const userFinded = await this.usersRepository.findOne({
          where: { id: decoded.id }
        });
        await this.removeAllConnectionsRepeatedUser(userFinded.id);
        if (userFinded) {
          this.connectedClients[client.id] = {
            socket: client,
            user: userFinded
          };
        }
      } catch (error) {
        client.disconnect();
      }
    }
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients() {
    return Object.keys(this.connectedClients);
  }

  getUserFullNameBySocketId(socketId: string) {
    return this.connectedClients[socketId].user.fullName;
  }

  private async removeAllConnectionsRepeatedUser(userId: string) {
    const connectedClients = this.connectedClients;
    Object.keys(connectedClients).forEach((socketId) => {
      const connectedClient = connectedClients[socketId];
      if (connectedClient.user.id === userId) {
        connectedClient.socket.disconnect();
        delete this.connectedClients[socketId];
      }
    });
  }
}
