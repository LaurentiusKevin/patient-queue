import { ApiProperty } from '@nestjs/swagger';

export class Doctor {
  @ApiProperty()
  name: string;

  @ApiProperty()
  average_consultation_time: number;
}

export class Patient {
  @ApiProperty()
  name: string;

  @ApiProperty()
  queue_number?: number | null | undefined;

  @ApiProperty()
  wait_time?: number | null | undefined;

  @ApiProperty()
  doctor?: string;
}

export class PatientToDoctorDistributionResponse {
  name: string;
  queue_number: number;
  wait_time: number;
}

export class EstimationPatientQueueDto {
  @ApiProperty({
    type: [Doctor],
  })
  doctors: Doctor[];

  @ApiProperty({
    type: [Patient],
  })
  patients: Patient[];
}
