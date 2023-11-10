import { QuestionsRepository } from "../repositories/questions-repository"

interface DeleteQuestionUseCaseRequest {
    questionId: string
    authorId: string
}

interface DeleteQuestionUseCaseResponse {
}

export class DeleteQuestionUseCase {
    private questionsRepository: QuestionsRepository

    constructor(questionsRepository: QuestionsRepository) { 
        this.questionsRepository = questionsRepository
    }


    async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId)

        if(!question) {
            throw new Error('Question not found.')
        }

        if(authorId !== question.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        await this.questionsRepository.delete(question);

        return {}
    }
}