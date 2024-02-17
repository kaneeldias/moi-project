import QuestionnaireInnerSkeleton from "@/components/questions/QuestionnaireInnerSkeletons";
import React from "react";
import {CardTitle} from "@/components/CardTitle";

export default async function QuestionnaireSkeleton() {
    return (
        <div className={`bg-white p-5 rounded-md h-fit shadow-md animate-pulse`}>
            <CardTitle title={"Impact Survey"} topOffset={5}/>

            <QuestionnaireInnerSkeleton/>
        </div>
    );
}