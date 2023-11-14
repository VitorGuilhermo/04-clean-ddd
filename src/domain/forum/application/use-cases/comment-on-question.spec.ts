import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let commentOnQuestionUseCase: CommentOnQuestionUseCase

describe('Comment on Question', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        commentOnQuestionUseCase = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository)
    })

    it('should be able to comment on question', async () => {
        const newQuestion = makeQuestion()

        inMemoryQuestionsRepository.create(newQuestion)

        await commentOnQuestionUseCase.execute({
            questionId: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString(),
            content: 'Comentário de teste'
        })
    
        expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual('Comentário de teste')
    })
})
