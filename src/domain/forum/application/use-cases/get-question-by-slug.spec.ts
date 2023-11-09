import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let getQuestionBySlugUseCase: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository,
        getQuestionBySlugUseCase = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to get a question by slug', async () => {
        const newQuestion = Question.create({
            authorId: new UniqueEntityId('1'),
            title: 'Nova pergunta',
            slug: Slug.create('nova-pergunta'),
            content: 'Conteúdo da pergunta'
        })

        inMemoryQuestionsRepository.create(newQuestion)     

        const { question } = await getQuestionBySlugUseCase.execute({
            slug: 'nova-pergunta'
        })
    
        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)
    })  
})
