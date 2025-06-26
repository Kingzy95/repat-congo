import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactsService {
  findAll() {
    return `This action returns all contacts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }
} 