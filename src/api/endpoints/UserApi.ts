import { APIRequestContext, expect } from '@playwright/test';
import { RegistrationData } from '../../data/ui/RegistrationData';
import { ApiEndpoints } from './ApiEndpoints';

export class UserApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async registerUser(data: RegistrationData) {
    const response = await this.request.post(ApiEndpoints.AUTH.REGISTER, {
      data: {
        email: data.email,
        password: data.password,
      },
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async loginUser(data: RegistrationData) {
    const response = await this.request.post(ApiEndpoints.AUTH.LOGIN, {
      data: {
        email: data.email,
        password: data.password,
      },
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async logoutUser() {
    const response = await this.request.post(ApiEndpoints.AUTH.LOGOUT);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async getUserProfile() {
    const response = await this.request.get(ApiEndpoints.USER.PROFILE);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async updateUserSettings(settings: Record<string, unknown>) {
    const response = await this.request.put(ApiEndpoints.USER.SETTINGS, {
      data: settings,
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await this.request.put(ApiEndpoints.USER.PASSWORD, {
      data: {
        currentPassword,
        newPassword,
      },
    });
    expect(response.ok()).toBeTruthy();
    return response;
  }
} 