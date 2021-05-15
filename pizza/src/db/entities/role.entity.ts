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
import Permission from './permission.entity'

export interface RoleInserPayload {
    name: string,
    description: string,
    permissions: Permission[]
}

@Entity()
export default class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        unique: true
    })
    name!: string;

    @Column()
    description?: string;

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
