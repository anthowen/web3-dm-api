import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  getHeathCheck(): string {
    return 'Ok';
  }
}
