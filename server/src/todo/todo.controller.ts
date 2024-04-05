// todo.controller.ts
import {Controller, Get, Post, Body, Param, Patch, Delete} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(+id);
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Todo> {
    return this.todoService.updateStatus(+id, status);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(+id);
  }

}