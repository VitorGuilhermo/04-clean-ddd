import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let deleteAnswerUseCase: DeleteAnswerUseCase

describe('Delete Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository,
        deleteAnswerUseCase = new DeleteAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to delete a answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('4'),
        }, new UniqueEntityId('1'))
        inMemoryAnswersRepository.create(newAnswer)     

        await deleteAnswerUseCase.execute({
            answerId: '1',
            authorId: '4' 
        })
    
        expect(inMemoryAnswersRepository.items).toHaveLength(0)
    })
    
    it('should not be able to delete a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-4'),
        }, new UniqueEntityId('1'))
        inMemoryAnswersRepository.create(newAnswer)     

        expect(async () => {
            return await deleteAnswerUseCase.execute({
                answerId: '1',
                authorId: 'author-55555' 
            })
        }).rejects.toBeInstanceOf(Error)
    })  
})
