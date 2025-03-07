import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidService {
  generateUuid(): string {
    return uuidv4();
  }
  generateTransactionNumber(): string {
    const uuid: string = this.generateUuid();
    return `TXN-${uuid}`;
  }
}
