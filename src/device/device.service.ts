import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Device } from './device.entity';
import DeviceDetector from 'device-detector-js';
import geoip from 'geoip-lite';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device)
    private readonly deviceEntity: ReturnModelType<typeof Device>,
  ) {}

  async getAllDevice(): Promise<Device[]> {
    return this.deviceEntity.find();
  }

  async createDevice(idDevice: string, userAgent: string): Promise<Device[]> {
    const device = new Device();
    const deviceDetector = new DeviceDetector();
    const deviceParse = deviceDetector.parse(userAgent);
    const ip = '207.97.227.239';
    const geo = geoip.lookup(ip);
    device.id_device = idDevice;
    device.os = deviceParse.os.name;
    device.brand = deviceParse.device.brand;
    device.model = deviceParse.device.model;
    device.location = `${geo.country}/${geo.city}`;
    return this.deviceEntity.find();
  }
}
