import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export default class Faq extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column()
  brain!: string

  @Column('simple-json')
  content!: { dataset: Array<any> }

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt?: Date

  @DeleteDateColumn({
    nullable: true
  })
  deletedAt?: Date
}
