import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  github: string

  @Column()
  behance: string

  @Column()
  link: string
}
