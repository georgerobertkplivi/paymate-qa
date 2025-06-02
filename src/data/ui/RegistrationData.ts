import { faker } from '@faker-js/faker';

export class RegistrationData {
  email: string;
  password: string;

  constructor() {
    this.email = faker.internet.email();
    this.password = faker.internet.password();
  }
} 