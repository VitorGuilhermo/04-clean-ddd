import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let commentOnAnswerUseCase: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        commentOnAnswerUseCase = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository)
    })

    it('should be able to comment on answer', async () => {
        const newAnswer = makeAnswer()

        inMemoryAnswersRepository.create(newAnswer)

        await commentOnAnswerUseCase.execute({
            answerId: newAnswer.id.toString(),
            authorId: newAnswer.authorId.toString(),
            content: 'Comentário de teste'
        })
    
        expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('Comentário de teste')
    })
})
