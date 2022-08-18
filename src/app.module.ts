import { Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypegooseModule.forRoot(process.env.MONGO_URI),
    DeviceModule,
  ],
})
export class AppModule {}
