import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { RealIP } from 'nestjs-real-ip';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  async getAllDevice(@Req() request, @Res() response) {
    const devices = await this.deviceService.getAllDevice();
    return await response.status(HttpStatus.OK).json({
      data: devices,
    });
  }

  @Post('/create')
  async createUser(
    @Body() createDeviceDto: CreateDeviceDto,
    @RealIP() ip: string,
    @Res() response,
  ) {
    console.log(createDeviceDto);
    await this.deviceService.createDevice(createDeviceDto, ip);
    return response.status(HttpStatus.OK).json({
      code: 200,
      message: 'ok',
    });
  }
}
