import { Module } from '@nestjs/common';
import { RegisterFormController } from './controllers/register-form.controller';
import { RegisterService } from './services/register.service';

@Module({
  imports: [],
  controllers: [RegisterFormController],
  providers: [RegisterService],
})
export class RegisterModule {}
