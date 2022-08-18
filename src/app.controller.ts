import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IpDecorator } from './common/ip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@IpDecorator() ip): string {
    return ip;
  }
}
