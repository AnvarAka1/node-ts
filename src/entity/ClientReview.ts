import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

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
}
