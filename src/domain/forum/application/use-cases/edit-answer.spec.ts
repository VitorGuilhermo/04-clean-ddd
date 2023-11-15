import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let editAnswerUseCase: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository,
        editAnswerUseCase = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to edit a answer', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('4'),
        }, new UniqueEntityId('1'))
        inMemoryAnswersRepository.create(newAnswer)     

        await editAnswerUseCase.execute({
            answerId: newAnswer.id.toString(),
            authorId: '4',
            content: 'Coteúdo de teste'
        })
    
        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Coteúdo de teste'
        })
    })
    
    it('should not be able to edit a answer from another user', async () => {
        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-4'),
        }, new UniqueEntityId('1'))
        inMemoryAnswersRepository.create(newAnswer)     

        const result = await editAnswerUseCase.execute({
            answerId: newAnswer.id.toString(),
            authorId: 'author-543543',
            content: 'Coteúdo de teste'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })  
})
