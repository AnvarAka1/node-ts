import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
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

  @ManyToOne(_type => Client, client => client.reviews)
  client: Client

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
