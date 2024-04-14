import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientQueueModule } from './patient-queue/patient-queue.module';

@Module({
  imports: [PatientQueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
