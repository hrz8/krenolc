import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import Role from './role.entity'
import Permission from './permission.entity'

export interface UserMetaData {
    bots: string[]
}

export interface UserInsertPayload {
    email: string;
    name: string;
    roles: Role[],
    permissions?: Permission[],
    metadata?: UserMetaData,
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

    @Column({
        nullable: true
    })
    lastLogin!: Date;

    @Column('simple-json')
    metadata!: UserMetaData

    @ManyToMany(() => Role)
    @JoinTable()
    roles?: Role[];

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions?: Permission[];

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn({
        nullable: true
    })
    deletedAt?: Date
}
