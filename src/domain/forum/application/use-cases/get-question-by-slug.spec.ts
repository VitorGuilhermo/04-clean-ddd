import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestionBySlugUseCase: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository,
        getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by slug', async () => {
        const newQuestion = makeQuestion({
            slug: Slug.create('nova-pergunta')
        })
        inMemoryQuestionsRepository.create(newQuestion)     

        const result = await getQuestionBySlugUseCase.execute({
            slug: 'nova-pergunta'
        })
    
        expect(result.isRight()).toBe(true)
        if (result.isRight()) {
            expect(result.value?.question.title).toEqual(newQuestion.title)
        }
    })  
})
