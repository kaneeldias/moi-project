import {Answer, AnswerList} from "@/components/questions/QuestionnaireInner";
import {validateCountInput, validateRatingInput} from "@/validators/input-validators";
import {QuestionStructure} from "@/types/question-types";

export function validateCounts(counts: Answer): boolean {
    if (validateCountInput(counts.initial) != "") {
        return false;
    }

    if (validateCountInput(counts.final) != "") {
        return false;
    }

    return true;
}

export function validateAnswer(answer: Answer, question: QuestionStructure): boolean {
    if (question.initial && validateRatingInput(answer.initial) != "") {
        return false;
    }

    if (question.final && validateRatingInput(answer.final) != "") {
        return false;
    }

    return true;
}

export function validateAnswers(answers: AnswerList, questions: QuestionStructure[]): boolean {
    for (const [id, answer] of Object.entries(answers)) {
        const question = questions.find(q => q.id === parseInt(id));
        if (!question) {
            return false;
        }

        if (!validateAnswer(answer, question)) {
            return false;
        }
    }

    return true;
}

export function validateQuestionnaire(counts: Answer, answers: AnswerList, questions: QuestionStructure[]): boolean {
    return validateAnswers(answers, questions) && validateCounts(counts);
}