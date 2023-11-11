import { AnswersRepository } from "../repositories/answers-repository"

interface DeleteAnswerUseCaseRequest {
    answerId: string
    authorId: string
}

interface DeleteAnswerUseCaseResponse {
}

export class DeleteAnswerUseCase {
    private answersRepository: AnswersRepository

    constructor(answersRepository: AnswersRepository) { 
        this.answersRepository = answersRepository
    }


    async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if(!answer) {
            throw new Error('Answer not found.')
        }

        if(authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        await this.answersRepository.delete(answer);

        return {}
    }
}