import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeHelper {
  hourToMinutes = (time: string): number => {
    const [hour, minutes] = time.split(':').map(Number);
    return hour * 60 + minutes;
  };

  isDurationValid = (start: number, end: number, duration: number) => {
    if (end - start !== duration) {
      return {
        status: false,
        message: `Duration time should be ${duration} minutes`,
      };
    }

    return {
      status: true,
      message: undefined,
    };
  };
}
