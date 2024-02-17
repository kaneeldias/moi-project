import RatingInput from "@/components/inputs/RatingInput";
import {Answer} from "@/components/questions/QuestionnaireInner";
import Question from "@/components/questions/Question";

type Props = {
    children: React.ReactNode;
    id: number,
    initial: boolean,
    final: boolean,
    postfix?: string
    answer: Answer;
    setAnswer: (id: number, answer: Answer) => void;
}

export default function RatingQuestion(props: Props) {
    const postfix = props.postfix ? props.postfix : 'score';

    const updateInitial = function(value: number) {
        const temp = props.answer;
        temp.initial = value;
        props.setAnswer(props.id, temp);
        props.answer.initial = value
    }

    const updateFinal = function(value: number) {
        const temp = props.answer;
        temp.final = value;
        props.setAnswer(props.id, temp);
        props.answer.final = value;
    }

    const ratingInputs: React.ReactNode = (
        <div className={'flex flex-row space-x-5'}>
            <RatingInput label={`Initial ${postfix}`} disabled={!props.initial}
                         value={props.answer.initial} setValue={updateInitial}/>
            <RatingInput label={`Final ${postfix}`} disabled={!props.final}
                         value={props.answer.final} setValue={updateFinal}/>
        </div>
    );

    return (
        <Question input={ratingInputs}>{props.children}</Question>
    );
}
