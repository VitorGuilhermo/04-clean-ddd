import { Either, right } from "@/core/either"
import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

interface AnswerQuestionUseCaseRequest {
    instructorId: string
    questionId:  string
    content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>


export class AnswerQuestionUseCase {
    private answersRepositoy: AnswersRepository

    constructor(answersRepository: AnswersRepository) { 
        this.answersRepositoy = answersRepository
    }


    async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
        const answer = Answer.create({ 
            content, 
            authorId: new UniqueEntityId(instructorId), 
            questionId: new UniqueEntityId(questionId)
        } )

        await this.answersRepositoy.create(answer)

        return right({ 
            answer,
        })
    }
}