import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let editQuestionUseCase: EditQuestionUseCase

describe('Edit Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository,
        editQuestionUseCase = new EditQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to edit a question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('4'),
        }, new UniqueEntityId('1'))
        inMemoryQuestionsRepository.create(newQuestion)     

        await editQuestionUseCase.execute({
            questionId: newQuestion.id.toString(),
            authorId: '4',
            title: 'Pergunta de teste',
            content: 'Coteúdo de teste'
        })
    
        expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
            title: 'Pergunta de teste',
            content: 'Coteúdo de teste'
        })
    })
    
    it('should not be able to edit a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-4'),
        }, new UniqueEntityId('1'))
        inMemoryQuestionsRepository.create(newQuestion)     

        const result = await editQuestionUseCase.execute({
            questionId: newQuestion.id.toString(),
            authorId: 'author-543543',
            title: 'Pergunta de teste',
            content: 'Coteúdo de teste'
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })  
})
