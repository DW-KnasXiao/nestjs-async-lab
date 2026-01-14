import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('dashboard')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getDashboard(@Param('id') id: string) {
    console.log(`Fetching dashboard for user: ${id}`);
    const start = Date.now();

    try {
      const result = await this.appService.getDashboard(id);
      const duration = Date.now() - start;
      console.log(`Request took ${duration}ms`);
      return { ...result, _meta: { duration: `${duration}ms` } };
    } catch (error) {
      console.error('Dashboard failed:', error);
      throw error;
    }
  }
}
