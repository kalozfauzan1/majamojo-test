import { IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  readonly id_device: string;

  @IsString()
  readonly user_agent: string;
}
