import {Answer} from "@/components/questions/QuestionnaireInner";
import Question from "@/components/questions/Question";
import CountInput from "@/components/inputs/CountInput";
import React from "react";

type Props = {
    children: React.ReactNode;
    answer: Answer;
    setAnswer: (answer: Answer) => void;
    finalSectionEnabled: boolean;
}

export default function CountQuestion(props: Props) {

    const updateInitial = function(value: number) {
        const temp = props.answer;
        temp.initial = value;
        props.setAnswer(temp);
        props.answer.initial = value
    }

    const updateFinal = function(value: number) {
        const temp = props.answer;
        temp.final = value;
        props.setAnswer(temp);
        props.answer.final = value;
    }

    const countInputs: React.ReactNode = (
        <div className={'flex flex-row space-x-5'}>
            <CountInput label={`Initial survey`} value={props.answer.initial} setValue={updateInitial}/>
            <CountInput label={`Final survey`} value={props.answer.final} setValue={updateFinal} disabled={!props.finalSectionEnabled}/>
        </div>
    );

    return (
        <Question input={countInputs}>{props.children}</Question>
    );
}
