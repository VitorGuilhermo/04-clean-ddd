import { connect } from "http2"
import { Answer } from "../entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId:  string
    content: string
}

export class AnswerQuestionUseCase {
    private answersRepositoy: AnswersRepository

    constructor(answersRepository: AnswersRepository) { 
        this.answersRepositoy = answersRepository
    }


    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer({ 
            content, 
            authorId: instructorId, 
            questionId
        } )

        await this.answersRepositoy.create(answer)

        return answer
    }
}