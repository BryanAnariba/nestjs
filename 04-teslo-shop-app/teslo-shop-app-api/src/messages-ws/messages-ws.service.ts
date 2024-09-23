import { Injectable } from '@nestjs/common';
import { ConnectedClients } from './interfaces';
import { Socket } from 'socket.io';



@Injectable()
export class MessagesWsService {

  private connectedClients: ConnectedClients = {};

  public registerClient (client: Socket) {
    this.connectedClients[client.id] = client;
  }

  public removeClient (clientId: string) {
    delete this.connectedClients[clientId];
  }


  public getConnectedClients (): string[] {
    return Object.keys(this.connectedClients);
  }

}
