import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Device } from './device.entity';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

@Module({
  imports: [TypegooseModule.forFeature([Device])],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
