import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  imagePath: string

  @Column()
  count: number

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
