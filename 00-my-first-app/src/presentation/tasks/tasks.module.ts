import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthMiddleware, LoggerMiddleware } from '../middlewares';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        {path: '/tasks', method: RequestMethod.GET}
      )
      .apply(AuthMiddleware)
      .forRoutes(
        {path: '/tasks', method: RequestMethod.POST}, 
        {path: '/tasks', method: RequestMethod.PATCH}, 
        {path: '/tasks', method: RequestMethod.DELETE}
      );
  }
}
