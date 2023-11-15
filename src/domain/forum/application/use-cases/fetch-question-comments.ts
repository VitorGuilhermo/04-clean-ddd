import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string
    page: number
}

interface FetchQuestionCommentsUseCaseResponse {
    comments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
    private questionCommentsRepository: QuestionCommentsRepository

    constructor(questionCommentsRepository: QuestionCommentsRepository) { 
        this.questionCommentsRepository = questionCommentsRepository
    }


    async execute({ questionId, page }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const comments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

        return {
            comments
        }
    }
}