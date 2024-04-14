import { PartialType } from '@nestjs/swagger';
import { CreatePatientQueueDto } from './create-patient-queue.dto';

export class UpdatePatientQueueDto extends PartialType(CreatePatientQueueDto) {}
