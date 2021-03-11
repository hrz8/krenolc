import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

type Content = { dataset: Array<any> }

export interface FaqInsertPayload {
  content: Content
}

@Entity()
export default class Faq extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column('simple-json')
  content!: Content

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn({
    nullable: true
  })
  deletedAt?: Date
}
