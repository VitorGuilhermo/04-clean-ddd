import { Slug } from "./value-objects/slug"
import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"

export interface QuestionProps {
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    title: string
    slug: Slug
    content: string
    createAt: Date
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
    static create(props: Optional<QuestionProps, 'createAt' | 'slug'>, id?: UniqueEntityId) {
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createAt: new Date()
        }, id)

        return question
    }

    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get bestAnswerId() {
        return this.props.bestAnswerId
    }

    get title() {
        return this.props.title
    }

    get slug() {
        return this.props.slug
    }

    get createAt() {
        return this.props.createAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get isNew(): boolean {
        return dayjs().diff(this.createAt, 'days') <= 3
    }

    get excerpt() {
        return this.content.substring(0, 120).trim().concat('...')
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = Slug.createFromText(title)
        this.touch()
    }

    set content(content: string) {
        this.props.content = content
        this.touch()
    }

    set bestAnswerId(bestAnswerId: UniqueEntityId) {
        this.props.bestAnswerId = bestAnswerId
        this.touch()
    }

    private touch() {
        this.props.updatedAt = new Date()
    }
}