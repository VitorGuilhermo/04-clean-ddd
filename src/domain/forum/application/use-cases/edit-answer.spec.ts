import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

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

        expect(async () => {
            return await editAnswerUseCase.execute({
                answerId: newAnswer.id.toString(),
                authorId: 'author-543543',
                content: 'Coteúdo de teste'
            })
        }).rejects.toBeInstanceOf(Error)
    })  
})
