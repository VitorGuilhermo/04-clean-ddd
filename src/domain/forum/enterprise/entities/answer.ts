import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface AnswerProps {
    content: string
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    createAt: Date
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    static create(props: Optional<AnswerProps, 'createAt'>, id?: UniqueEntityId) {
        const answer = new Answer({
            ...props,
            createAt: new Date()
        }, id)

        return answer
    }

    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
    }

    get createAt() {
        return this.props.createAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get excerpt() {
        return this.content.substring(0, 120).trim().concat('...')
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}