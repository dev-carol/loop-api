import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './exceptions-filters/prisma.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Loop API')
    .setDescription('A dynamic and continuous social interaction API.')
    .setVersion('1.0')
    .build();

  app.useGlobalFilters(new PrismaExceptionFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5001);
}
bootstrap();
