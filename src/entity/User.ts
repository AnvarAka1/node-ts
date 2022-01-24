import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne } from 'typeorm'

import { Freelancer } from 'src/entity/Freelancer'
import { Client } from 'src/entity/Client'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role: string

  @Column()
  email: string

  @Column()
  avatar: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  fullName: string

  @Column()
  phone: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column()
  age: number

  @OneToOne(_type => Freelancer, freelancer => freelancer.user, { nullable: true })
  freelancer: Freelancer

  @OneToOne(_type => Client, client => client.user, { nullable: true })
  client: Client
}
