import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let deleteQuestionCommentUseCase: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
        deleteQuestionCommentUseCase = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
    })

    it('should not be able to delete another user question comment', async () => {
        const newQuestionComment = makeQuestionComment({
            authorId: new UniqueEntityId('1')
        })

        inMemoryQuestionCommentsRepository.create(newQuestionComment)

        expect(async () => {
            return await deleteQuestionCommentUseCase.execute({
                questionCommentId: newQuestionComment.id.toString(),
                authorId: '22',
            })
        }).rejects.toBeInstanceOf(Error)
    })

    it('should be able to delete a question comment', async () => {
        const newQuestionComment = makeQuestionComment()

        inMemoryQuestionCommentsRepository.create(newQuestionComment)

        await deleteQuestionCommentUseCase.execute({
            questionCommentId: newQuestionComment.id.toString(),
            authorId: newQuestionComment.authorId.toString(),
        })
    
        expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
    })
})
