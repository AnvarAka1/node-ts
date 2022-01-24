import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Client } from 'src/entity/Client'

@Entity()
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(_type => Client, client => client.position)
  clients: Client[]
}
