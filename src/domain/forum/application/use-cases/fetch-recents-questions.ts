import { Question } from "../../enterprise/entities/question"
import { QuestionsRepository } from "../repositories/questions-repository"

interface FetchRecentsQuestionsUseCaseRequest {
    page: number
}

interface FetchRecentsQuestionsUseCaseResponse {
    questions: Question[]
}

export class FetchRecentsQuestionsUseCase {
    private questionsRepository: QuestionsRepository

    constructor(questionsRepository: QuestionsRepository) { 
        this.questionsRepository = questionsRepository
    }


    async execute({ page }: FetchRecentsQuestionsUseCaseRequest): Promise<FetchRecentsQuestionsUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({ page });

        return {
            questions
        }
    }
}