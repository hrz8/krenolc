import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

export interface Content {
  modules: {
    [moduleId: string]: {
      enabled: boolean,
      [other: string]: any
    }
  },
  content: {
    [contentId: string]: {
      content: {
        text: string | Array<string>,
        buttons?: Array<any>,
        quickReplies?: Array<any>
      }
    }
  }
}

export interface BotInsertPayload {
  content: Content
}

@Entity()
export default class Bot extends BaseEntity {
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
