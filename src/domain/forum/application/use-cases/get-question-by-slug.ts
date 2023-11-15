import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Either, right } from "@/core/either"

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<null, { question: Question }>

export class GetQuestionBySlugUseCase {
    private questionsRepository: QuestionsRepository

    constructor(questionsRepository: QuestionsRepository) { 
        this.questionsRepository = questionsRepository
    }


    async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug);

        if(!question) {
            throw new Error('Question not found.')
        }

        return right({
            question
        })
    }
}