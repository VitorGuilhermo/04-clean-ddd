import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface AnswerCommentProps {
    content: string
    authorId: UniqueEntityId
    answerId: UniqueEntityId
    createdAt: Date
    updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
    static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId) {
        const answerComment = new AnswerComment({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id)

        return answerComment
    }

    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}