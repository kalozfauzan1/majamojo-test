import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const options = new DocumentBuilder()
    .setTitle('Device')
    .setDescription('The device API description')
    .setVersion('1.0')
    .addTag('device')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
