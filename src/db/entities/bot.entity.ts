import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export type BotContent = { modules: any, content: any }

export interface BotInsertPayload {
  content: BotContent
}

@Entity()
export default class Bot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('simple-json')
  content!: BotContent

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn({
    nullable: true
  })
  deletedAt?: Date
}
