"use client";

import RatingQuestion from "@/components/questions/RatingQuestion";
import {QuestionStructure, SurveyResponse} from "@/types/question-types";
import React, {useEffect, useState} from "react";
import CountQuestion from "@/components/questions/CountQuestion";
import {validateQuestionnaire} from "@/validators/questionnaire-validators";
import QuestionnaireInnerSkeleton from "@/components/questions/QuestionnaireInnerSkeletons";
import {mapQuestionnaireToRequest} from "@/mappers/questionnaire-mappers";
import {Alert, Spinner} from "@material-tailwind/react";
import Heading from "@/components/Heading";
import {QuestionType} from "@prisma/client";
import {CardTitle} from "@/components/CardTitle";

type Props = {
    projectName: string;
    projectId: string;
    questions: QuestionStructure[];
    response: SurveyResponse;
    finalSectionEnabled: boolean;
}

export type Answer = {
    initial: number | null;
    final: number | null;
}

export type AnswerList = {
    [id: number]: Answer;
}

export default function QuestionnaireInner(props: Props) {
    const [counts, setCounts] = useState<Answer>({initial: props.response?.initialCount, final: props.response?.finalCount});
    const [answers, setAnswers] = useState<AnswerList>({});
    const [formValid, setFormValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
    const [errorContent, setErrorContent] = useState<string>('');
    const [submissionSuccessful, setSubmissionSuccessful] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const tempAnswers: AnswerList = {};
        for (let i = 0; i < props.questions.length; i++) {
            const questionId = props.questions[i].id;
            tempAnswers[questionId] = {initial: 0, final: 0};

            if (props.response) {
                const initialValue = props.response.answers.find(answer => answer.questionId === questionId && answer.type === QuestionType.INITIAL);
                const finalValue = props.response.answers.find(answer => answer.questionId === questionId && answer.type === QuestionType.FINAL);

                if (initialValue != null) {
                    tempAnswers[questionId].initial = initialValue.answer;
                }

                if (finalValue != null) {
                    tempAnswers[questionId].final = finalValue.answer;
                }
            }
        }
        setAnswers(tempAnswers);
        setLoading(false);
    }, []);


    const updateCounts = function(answer: Answer) {
        setCounts(answer);
        setFormValid(validateQuestionnaire(counts, answers, props.questions, props.finalSectionEnabled));
    }

    const updateAnswer = function(id: number, answer: Answer) {
        const temp = answers;
        temp[id] = answer;
        setAnswers(temp);
        setFormValid(validateQuestionnaire(counts, answers, props.questions, props.finalSectionEnabled));
    }

    const submitForm = async function() {
        setErrorContent('');
        setSubmissionLoading(true);
        await fetch(`/api/questionnaire/${props.projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mapQuestionnaireToRequest(counts, answers)),
        }).then(response => {
            if (!response.ok) {
                console.error(response);
                setErrorContent(`${response.status}: ${response.statusText}`);
                return;
            }
            setSubmissionSuccessful(true);
        }).catch(error => {
            console.error('Error:', error);
            setErrorContent('An error occurred while submitting the form');
        }).finally(() => {
            setSubmissionLoading(false);
        });
    }

    return (
        <div className={`bg-white p-5 rounded-md h-fit shadow-md relative`}>
            <CardTitle title={"Impact Survey"} topOffset={5}/>

            {loading &&
                <QuestionnaireInnerSkeleton/>
            }

            {!loading &&
                <div className={`relative`}>

                    <div className={`flex flex-col space-y-5`}>
                        <div className={`flex flex-col space-y-16 max-w-2xl`}>
                            <CountQuestion answer={counts} setAnswer={updateCounts} finalSectionEnabled={props.finalSectionEnabled}>
                                How many beneficiaries filled the initial and final survey?
                            </CountQuestion>

                            {Object.keys(answers).length > 0 && props.questions.map((question, index) => (
                                <RatingQuestion key={index} id={question.id} initial={question.initial}
                                                final={question.final}
                                                answer={answers[question.id]} setAnswer={updateAnswer}
                                                finalSectionEnabled={props.finalSectionEnabled}>
                                    {question.text}
                                </RatingQuestion>
                            ))}

                        </div>

                        <button
                            className={`flex flex-col bg-blue-700 text-color-white font-bold text-white p-3 w-32 mt-16 rounded-md hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center`}
                            disabled={!formValid || submissionLoading}
                            onClick={submitForm}
                        >
                            Submit
                        </button>

                        <Alert open={errorContent != ""} onClose={() => setErrorContent("")} className={`text-sm`}
                               color={"red"}>
                            {errorContent}
                        </Alert>
                    </div>
                </div>

            }

            {submissionLoading &&
                <div
                    className={`flex flex-row items-center justify-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-75 rounded-md`}>
                    <Spinner color={"blue"} className={`w-32 h-32`} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}/>
                </div>
            }

            {submissionSuccessful &&
                <div
                    className={`flex flex-row items-center justify-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-85 rounded-md`}>
                    <div className={`flex flex-col items-center justify-center text-center space-y-10`}>
                        <div className={`w-32 h-32`}>
                            <svg className={`text-green-600`} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
                                    fill="#14bd47"></path>
                            </svg>
                        </div>
                        <div className={`flex flex-col space-y-5 items-center justify-center`}>
                            <Heading color={'text-gray-700'}>Your response has been recorded!</Heading>
                            <button className={`flex flex-col bg-gray-700 text-color-white font-bold text-white w-fit p-3 mt-16 rounded-md hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center`}
                                    onClick={() => setSubmissionSuccessful(false)}>Edit Response</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
