import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

import { Client } from 'src/entity/Client'

@Entity()
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(_type => Client, client => client.position)
  clients: Client[]

  @CreateDateColumn({ select: false })
  createAt: Date

  @UpdateDateColumn({ select: false })
  updatedAt: Date
}
