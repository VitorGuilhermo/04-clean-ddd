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
        const { answer } = await answerQuestionUseCase.execute({
            questionId: '1',
            instructorId: '1',
            content: 'Nova resposta'
        })

        expect(answer.content).toEqual('Nova resposta')
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
    })
})