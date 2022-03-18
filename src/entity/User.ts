import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { IsEmail, Length } from 'class-validator'

import { Freelancer } from 'src/entity/Freelancer'
import { Client } from 'src/entity/Client'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role: string

  @Column()
  @IsEmail()
  email: string

  @Column({ select: false })
  password: string

  @Column({ default: '' })
  avatar: string

  @Column()
  @Length(2, 20)
  firstName: string

  @Column()
  @Length(2, 20)
  lastName: string

  @Column({ default: '' })
  fullName: string

  @Column({ default: '' })
  phone: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ nullable: true })
  age: number

  @OneToOne(_type => Freelancer, freelancer => freelancer.user, { nullable: true })
  freelancer: Freelancer

  @OneToOne(_type => Client, client => client.user, { nullable: true })
  client: Client

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
