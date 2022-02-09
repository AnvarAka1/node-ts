import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Client } from 'src/entity/Client'

@Entity()
export class ClientReview extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  stars: number

  @Column('text')
  comment: string

  @OneToOne(_type => Client, client => client.review)
  client: Client

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
