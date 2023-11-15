import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"
import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

interface GetQuestionBySlugUseCaseRequest {
    slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>

export class GetQuestionBySlugUseCase {
    private questionsRepository: QuestionsRepository

    constructor(questionsRepository: QuestionsRepository) { 
        this.questionsRepository = questionsRepository
    }


    async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug);

        if(!question) {
            return left(new ResourceNotFoundError())
        }

        return right({
            question
        })
    }
}