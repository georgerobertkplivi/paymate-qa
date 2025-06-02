import { test } from '@playwright/test';
import { UserApi } from '../../api/endpoints/UserApi';
import { RegistrationData } from '../../data/ui/RegistrationData';
import allure from 'allure-playwright';

test.describe('User API', () => {
  test('should register and login user via API', async ({ request }) => {
    const userApi = new UserApi(request);
    const data = new RegistrationData();

    await test.step('Register user via API', async () => {
      await userApi.registerUser(data);
    });

    await test.step('Login user via API', async () => {
      await userApi.loginUser(data);
    });
  });
}); 