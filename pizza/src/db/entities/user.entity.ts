import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'

export interface UserMetaData {
    permissions: string[],
    roles: string[],
    bots: string[]
}

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    name!: string;

    @Column()
    lastLogin!: Date;

    @Column('simple-json')
    metadata!: UserMetaData

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt?: Date
}
