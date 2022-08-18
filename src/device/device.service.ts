import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { DeviceEntity } from './device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(DeviceEntity)
    private readonly deviceEntity: ReturnModelType<typeof DeviceEntity>,
  ) {}

  async getAllDevice(): Promise<DeviceEntity[]> {
    return this.deviceEntity.find();
  }
}
