import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { Answer } from '../../enterprise/entities/answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let chooseQuestionBestAnswerUseCase: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
        chooseQuestionBestAnswerUseCase = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
    })

    it('should be able to choose the question best answer', async () => {
        const newQuestion = makeQuestion()

        const newAnswer = makeAnswer({
            questionId: newQuestion.id
        })

        inMemoryQuestionsRepository.create(newQuestion)
        inMemoryAnswersRepository.create(newAnswer)     


        await chooseQuestionBestAnswerUseCase.execute({
            answerId: newAnswer.id.toString(),
            authorId: newQuestion.authorId.toString(),
        })
    
        expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(newAnswer.id)
    })
    
    it('should not be able to choose another user question best answer', async () => {
        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-1')
        })

        const newAnswer = makeAnswer({
            questionId: newQuestion.id
        })

        inMemoryQuestionsRepository.create(newQuestion)
        inMemoryAnswersRepository.create(newAnswer)     

        const result = await chooseQuestionBestAnswerUseCase.execute({
            answerId: newAnswer.id.toString(),
            authorId: 'author-55555' 
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })  
})
