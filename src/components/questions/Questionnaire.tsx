import {QuestionStructure} from "@/types/question-types";
import { promises as fs } from 'fs';
import QuestionnaireInner from "@/components/questions/QuestionnaireInner";
import {getQuestions, getSurveyResponse} from "@/utils/questionnaire-utils";

type Props = {
    projectName: string;
    projectId: string;
}

export default async function Questionnaire(props: Props) {
    const questions = await getQuestions(props.projectName);
    const surveyResponse = await getSurveyResponse(parseInt(props.projectId));

    return (
        <QuestionnaireInner projectName={props.projectName} projectId={props.projectId} questions={questions} response={surveyResponse}/>
    );
}