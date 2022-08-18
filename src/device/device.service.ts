import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Device } from './device.entity';
import DeviceDetector from 'device-detector-js';
import geoIp from 'geoip-lite';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device)
    private readonly deviceEntity: ReturnModelType<typeof Device>,
  ) {}

  async getAllDevice(): Promise<Device[]> {
    return await this.deviceEntity.find();
  }

  async createDevice(
    createDeviceDto: CreateDeviceDto,
    ip: string,
  ): Promise<Device> {
    const isExist = await this.deviceEntity.findOne({
      id_device: createDeviceDto.id_device,
    });
    if (isExist) return isExist;

    const device = new Device();
    const deviceDetector = new DeviceDetector();
    const deviceParse = deviceDetector.parse(createDeviceDto.user_agent);
    const geo = geoIp.lookup(ip);
    device.id_device = createDeviceDto.id_device;
    device.os = deviceParse.os.name;
    device.brand = deviceParse.device.brand;
    device.model = deviceParse.device.model;
    device.location = `${geo.country}/${geo.city}`;
    const createDevice = new this.deviceEntity(device);
    return await createDevice.save();
  }
}
