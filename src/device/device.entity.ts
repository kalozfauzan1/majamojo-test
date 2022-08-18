import { index, Prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Transform } from '@nestjs/class-transformer';

export class Device {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;
  @Prop()
  id_device: string;
  @Prop()
  os: string;
  @Prop()
  brand: string;
  @Prop()
  model: string;
  @Prop()
  location: string;

  constructor(device?: Partial<Device>) {
    Object.assign(this, device);
  }
}
