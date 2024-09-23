import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';

/*
  namespace: es como sala de chat por ejemplo sala de 
  tu casa al ver una peli y todos los que van a ver la 
  peli serian los clientes o personas, ojo a esto
*/

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() webSocketServer: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  public handleConnection(client: Socket) {
    // Se registra el cliente conectado
    this.messagesWsService.registerClient(client);
    console.log(`Client ${client.id} connected!, Clients Connected: ${this.messagesWsService.getConnectedClients()}`);

    // Cuando se connecta uno nueva persona, se emite al frontend el listado actualizado con el nuevo cliente conectado
    this.webSocketServer.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  public handleDisconnect(client: Socket) {
    // Se elimina el cliente conectado
    this.messagesWsService.removeClient(client.id);
    console.log(`Client ${client.id} disconnect!, Clients Connected: ${this.messagesWsService.getConnectedClients()}`);

    // Cuando se desconecta tambien uno persona, se emite al frontend el listado actualizado con el nuevo cliente conectado
    this.webSocketServer.emit('clients-updated', this.messagesWsService.getConnectedClients());
  }

  // Esto sirve para capturar los mensajes del frontend: message-from-client
  @SubscribeMessage('message-from-client')
  public onMessageFromClient (client: Socket, payload: NewMessageDto) {
    console.log({id: client.id, message: payload});
  }


}
