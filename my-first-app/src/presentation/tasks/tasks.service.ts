import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(taskId: number) {
    return `This action returns a #${taskId} task`;
  }

  update(taskId: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${taskId} task`;
  }

  remove(taskId: number) {
    return `This action removes a #${taskId} task`;
  }
}
