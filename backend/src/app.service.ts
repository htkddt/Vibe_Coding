import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      service: '179fc-mms-backend',
      status: 'ok',
    };
  }
}
