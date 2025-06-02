import { faker } from '@faker-js/faker';

export const getRandomEmail = (): string => faker.internet.email();

export const getRandomPassword = (): string => faker.internet.password({ length: 12, memorable: true });