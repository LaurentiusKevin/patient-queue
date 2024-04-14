import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { PatientQueueService } from './patient-queue.service';
import { CreatePatientQueueDto } from './dto/create-patient-queue.dto';
import { UpdatePatientQueueDto } from './dto/update-patient-queue.dto';
import { EstimationPatientQueueDto } from './dto/estimation-patient-queue.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('patient-queue')
export class PatientQueueController {
  constructor(private readonly patientQueueService: PatientQueueService) {}

  @ApiTags('Queue')
  @Post('/estimation')
  estimation(@Body() params: EstimationPatientQueueDto, @Res() res: Response) {
    if (params.patients.length === 0) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: 'Patients is required!' });
    }
    if (params.doctors.length === 0) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: 'Doctors is required!' });
    }

    const data = this.patientQueueService.estimation(params);

    res.status(200).json({ message: 'success', patients: data.patients });
  }
}
