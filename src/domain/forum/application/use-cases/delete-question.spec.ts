import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let deleteQuestionUseCase: DeleteQuestionUseCase

describe('Delete Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository,
        deleteQuestionUseCase = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to delete a question', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('4'),
        }, new UniqueEntityId('1'))
        inMemoryQuestionsRepository.create(newQuestion)     

        await deleteQuestionUseCase.execute({
            questionId: '1',
            authorId: '4' 
        })
    
        expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    })
    
    it('should not be able to delete a question from another user', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-4'),
        }, new UniqueEntityId('1'))
        inMemoryQuestionsRepository.create(newQuestion)     

        expect(async () => {
            return await deleteQuestionUseCase.execute({
                questionId: '1',
                authorId: 'author-55555' 
            })
        }).rejects.toBeInstanceOf(Error)
    })  
})
