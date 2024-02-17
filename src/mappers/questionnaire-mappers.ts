import {Answer, AnswerList} from "@/components/questions/QuestionnaireInner";
import {QuestionnaireSubmissionRequest} from "@/types/question-types";
import {QuestionType} from "@prisma/client";

export function mapQuestionnaireToRequest(counts: Answer, answers: AnswerList): QuestionnaireSubmissionRequest  {
    const answersFormatted: {
        questionId: number,
        type: QuestionType,
        answer: number
    }[] = [];

    Object.keys(answers).map((key) => {
        const answer = answers[parseInt(key)];
        const questionId = parseInt(key);
        let res = {};

        if (answer.initial !== null) {
            answersFormatted.push({
                questionId: questionId,
                type: QuestionType.INITIAL,
                answer: answer.initial
            });
        }

        if (answer.final !== null) {
            answersFormatted.push({
                questionId: questionId,
                type: QuestionType.FINAL,
                answer: answer.final
            });
        }
    });

    return {
        counts: {
            initial: counts.initial!,
            final: counts.final!
        },
        answers: answersFormatted
    }
}