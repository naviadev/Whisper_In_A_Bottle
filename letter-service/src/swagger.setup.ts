import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * * Function : setupSwagger
 * 작성자 : @naviadev / 2024-08-04
 * 편집자 : @naviadev / 2024-08-04
 * Issue :
 * @function setupSwagger
 * @description : Swagger 설정 파일.
 * @param app: INestApplication
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Letter_Service_Document')
    .setDescription('Letter Service API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
