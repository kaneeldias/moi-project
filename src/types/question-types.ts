import {QuestionType} from "@prisma/client";

export type QuestionStructure = {
    id: number,
    text: string,
    initial: boolean,
    final: boolean
}

export type QuestionnaireSubmissionRequest = {
    counts: {
        initial: number,
        final: number
    }
    answers: {
        questionId: number,
        type: QuestionType,
        answer: number
    }[]
}

export type SurveyResponse = {
    initialCount: number;
    finalCount: number;
    answers: {
        questionId: number;
        type: string;
        answer: number;
    }[]
}

export type AnalysisRow = {
    id: number,
    question: string,
    totalInitialCount: number,
    averageInitialScore: number,
    totalFinalCount: number,
    averageFinalScore: number
    change: number
}