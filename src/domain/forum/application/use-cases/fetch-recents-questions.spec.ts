import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentsQuestionsUseCase } from './fetch-recents-questions'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let fetchRecentsQuestionsUseCase: FetchRecentsQuestionsUseCase

describe('Fetch Recents Question', () => {
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository,
        fetchRecentsQuestionsUseCase = new FetchRecentsQuestionsUseCase(inMemoryQuestionsRepository)
    })

    it('should be able to fetch recent questions', async () => {
        await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2023, 2, 19) }))
        await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2023, 4, 2) }))
        await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date(2023, 1, 29) }))

        const { questions } = await fetchRecentsQuestionsUseCase.execute({
            page: 1,
        })

        expect(questions).toEqual([
            expect.objectContaining({ createdAt: new Date(2023, 4, 2)}),
            expect.objectContaining({ createdAt: new Date(2023, 2, 19)}),
            expect.objectContaining({ createdAt: new Date(2023, 1, 29)}),
        ])
    })

    it('should be able to fetch paginated recent questions', async () => {
        for(let i = 0; i < 22; i++) {
            await inMemoryQuestionsRepository.create(makeQuestion())
        }

        const { questions } = await fetchRecentsQuestionsUseCase.execute({
            page: 2,
        })

        expect(questions).toHaveLength(2)
    }) 
})
