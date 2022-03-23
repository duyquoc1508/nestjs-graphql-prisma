import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(8080) // allow options as {namespace: '/chat'} */
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger : Logger = new Logger('EventGateway');

  afterInit(server: Server) {
    this.logger.log('EventGateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    this.server.emit('push', 'message')
    return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  /**
   * @param payload {room: 'string', message: 'string'}
   */
  @SubscribeMessage('msgToServer')
  public handleMessage(client: Socket, payload: any): Boolean {
    console.log('room', payload.room)
    console.log('message', payload.message)
    return this.server.to(payload.room).emit('msgToClient', payload.message);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, room: string): void {
    client.join(room);
    this.server.to(room).emit('joinRoom', `Client: ${client.id} joined the chat`)
    // client.emit('joinRoom', room)
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(client: Socket, room: string): void {
    client.leave(room);
    this.server.to(room).emit('leaveRoom', `Client: ${client.id} leaved the chat`)
    // client.emit('leaveRoom', room) // emit to this client
  }
}
