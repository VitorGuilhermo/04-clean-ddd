import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestionUseCase: AnswerQuestionUseCase

describe('Create Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository,
        answerQuestionUseCase = new AnswerQuestionUseCase(inMemoryAnswersRepository)
    })

    test('create a answer', async () => {
        const result = await answerQuestionUseCase.execute({
            questionId: '1',
            instructorId: '1',
            content: 'Nova resposta'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    })
})