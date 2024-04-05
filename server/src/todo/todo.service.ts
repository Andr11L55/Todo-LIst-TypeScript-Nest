// todo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
      @InjectRepository(Todo)
      private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async updateStatus(id: number, status: string): Promise<Todo> {
    const todo = await this.findOne(id);
    todo.status = status;
    return this.todoRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }

}