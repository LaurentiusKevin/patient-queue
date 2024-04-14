import { Injectable } from '@nestjs/common';
import {
  Doctor,
  EstimationPatientQueueDto,
  Patient,
} from './dto/estimation-patient-queue.dto';

@Injectable()
export class PatientQueueService {
  doctorsAverage(doctors: Doctor[]) {
    const sum = doctors.reduce(
      (total, item) => total + item.average_consultation_time,
      0,
    );

    return sum / doctors.length;
  }

  patientToDoctorDistribution(doctors: Doctor[], patients: Patient[]) {
    let doctorToPatient = doctors.map((item) => ({
      ...item,
      patients: [],
    }));

    patients.forEach((item, key) => {
      const lowestDoctorTotalTime = doctorToPatient.reduce(
        (prevLowest, current, currentKey) => {
          const currentTotalTime =
            current.patients.length * current.average_consultation_time;
          const prevTotalTime =
            prevLowest.data.patients.length *
            prevLowest.data.average_consultation_time;

          return currentTotalTime < prevTotalTime
            ? { data: current, key: currentKey }
            : prevLowest;
        },
        { data: doctorToPatient[0], key: 0 },
      );

      doctorToPatient[lowestDoctorTotalTime.key].patients.push(item);

      patients[key].doctor = doctorToPatient[lowestDoctorTotalTime.key].name;
      patients[key].wait_time =
        (doctorToPatient[lowestDoctorTotalTime.key].patients.length - 1) *
        doctorToPatient[lowestDoctorTotalTime.key].average_consultation_time;
    });

    return {
      doctors: doctorToPatient,
      patients,
    };
  }

  estimation({ doctors, patients }: EstimationPatientQueueDto) {
    return this.patientToDoctorDistribution(doctors, patients);
  }
}
