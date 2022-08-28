import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterFormController } from './register-form/register-form.controller';

@Module({
  imports: [],
  controllers: [AppController, RegisterFormController],
  providers: [AppService],
})
export class AppModule {}
