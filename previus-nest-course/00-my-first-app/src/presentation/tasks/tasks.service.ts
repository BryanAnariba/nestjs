import { HttpException, HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/domain';

@Injectable()
export class TasksService extends PrismaClient implements OnModuleInit {

  private logger = new Logger('@TaskService@');
  
  onModuleInit() {
    this.$connect();
    this.logger.log('Database in task service running');
  }

  create(createTaskDto: CreateTaskDto) {
    return this.task.create({
      data: createTaskDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const [tasks, totalTasks] = await Promise.all([
      this.task.findMany({
        where: {
          status: false,
        },
        take: paginationDto.limit,
        skip: (paginationDto.page <= 0) ? 0 : paginationDto.page * paginationDto.limit
      }),
      this.task.count({
        where: {
          status: false,
        },
      })
    ]);
    return {
      tasks,
      totalTasks,
    };
  }

  async findOne(taskId: string) {
    const task = await this.task.findFirst({
      where: {
        code: taskId,
        status: false,
      }
    });
    if (!task) throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND);
    return task;
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(taskId);
    return this.task.update({
      where: {
        code: taskId,
      },
      data: {
        name: updateTaskDto.name,
      }
    });
  }

  async remove(taskId: string) {
    await this.findOne(taskId);
    return this.task.update({
      where: {
        code: taskId,
      },
      data: {
        status: true,
      }
    });
  }
}
