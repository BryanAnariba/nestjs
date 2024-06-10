import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseBoolPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PaginationDto } from 'src/domain';
import { ValidateUserPipe } from '../pipes';
import { AuthGuard } from '../guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiTags('Tasks')
  @ApiOperation({summary: 'Create Task'})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiTags('Tasks')
  @ApiOperation({summary: 'Get all Tasks'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tasksService.findAll(paginationDto);
  }

  @Get(':taskId')
  @ApiTags('Tasks')
  @ApiOperation({summary: 'Get a Task'})
  @ApiResponse({status: 200, description: 'Getting a task'})
  @ApiResponse({status: 404, description: 'Not Found a task'})
  findOne(@Param('taskId') taskId: string) {
    return this.tasksService.findOne(taskId);
  }

  @Patch(':taskId')
  @ApiTags('Tasks')
  @ApiOperation({summary: 'Update a Task'})
  update(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Get('ticket/:ticketId')
  @ApiTags('Example')
  getTicket (@Param('ticketId', ParseIntPipe) ticketId: number) {
    return {
      ticketId,
    };
  }

  @UseGuards(AuthGuard)
  @ApiTags('Example')
  @Get('is-active/:status')
  @ApiOperation({summary: 'Sending a boolean field in params'})
  getStatus(@Param('status', ParseBoolPipe) status: boolean) {
    return {
      status: (status) ? 'Yes' : 'No',
    };
  }
  
  @UseGuards(AuthGuard)
  @ApiTags('Example')
  @Get('view/greet')
  @ApiOperation({summary: 'Sending a query params but usign pipe'})
  greet(@Query(ValidateUserPipe) query: {name: string, age: number}) {
    return `Hi ${query.name}!, your age is ${query.age}.`;
  }

  @Delete(':taskId')
  @ApiTags('Tasks')
  @ApiOperation({summary: 'Delete a Task'})
  remove(@Param('taskId') taskId: string) {
    return this.tasksService.remove(taskId);
  }
}
