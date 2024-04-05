// todo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar', default: 'Pending' })
    status: string;
}
