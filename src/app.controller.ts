import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { IpDecorator } from './common/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request): string {
    const remoteAddress = request.connection.remoteAddress;
    const remotePort = request.connection.remotePort;
    const localAddress = request.connection.localAddress;
    const localPort = request.connection.localPort;
    return `${remoteAddress}-${remotePort}-${localAddress}-${localPort}`;
  }
}
