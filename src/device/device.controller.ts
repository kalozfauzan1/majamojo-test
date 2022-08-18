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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('device')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({ summary: 'List device' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Device,
  })
  async getAllDevice(@Req() request, @Res() response) {
    const devices = await this.deviceService.getAllDevice();
    return await response.status(HttpStatus.OK).json({
      status: 200,
      data: devices,
    });
  }

  @Post('/create')
  @ApiResponse({ status: 500, description: 'error required body.' })
  async createUser(
    @Body() createDeviceDto: CreateDeviceDto,
    @RealIP() ip: string,
    @Res() response,
  ) {
    await this.deviceService.createDevice(createDeviceDto, ip);
    return response.status(HttpStatus.OK).json({
      code: 200,
      message: 'ok',
    });
  }
}
