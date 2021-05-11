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
    },
    trigger: {
        [contentId: string]: {
            pattern: string,
            event: string,
            data?: Record<any, string> | string,
            context?: string,
            priority?: number
        }
    }
}

export interface BotInsertPayload {
    brain: string;
    content?: Content,
}

@Entity()
export default class Bot extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        unique: true
    })
    brain!: string;

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
