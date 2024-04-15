import {Answer, AnswerList} from "@/components/questions/QuestionnaireInner";
import {validateCountInput, validateRatingInput} from "@/validators/input-validators";
import {QuestionStructure} from "@/types/question-types";

export function validateCounts(counts: Answer, finalSectionEnabled: boolean): boolean {
    if (validateCountInput(counts.initial) != "") {
        return false;
    }

    if (finalSectionEnabled && validateCountInput(counts.final) != "") {
        return false;
    }

    return true;
}

export function validateAnswer(answer: Answer, question: QuestionStructure, finalSectionEnabled: boolean): boolean {
    if (question.initial && validateRatingInput(answer.initial) != "") {
        return false;
    }

    if (question.final && validateRatingInput(answer.final) != "" && finalSectionEnabled) {
        return false;
    }

    return true;
}

export function validateAnswers(answers: AnswerList, questions: QuestionStructure[], finalSectionEnabled: boolean): boolean {
    for (const [id, answer] of Object.entries(answers)) {
        const question = questions.find(q => q.id === parseInt(id));
        if (!question) {
            return false;
        }

        if (!validateAnswer(answer, question, finalSectionEnabled)) {
            return false;
        }
    }

    return true;
}

export function validateQuestionnaire(counts: Answer, answers: AnswerList, questions: QuestionStructure[], finalSectionEnabled: boolean): boolean {
    return validateAnswers(answers, questions, finalSectionEnabled) && validateCounts(counts, finalSectionEnabled);
}