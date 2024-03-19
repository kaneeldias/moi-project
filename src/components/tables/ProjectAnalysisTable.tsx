import Table from "@/components/tables/Table";
import {waitRandomTime} from "@/utils/test-utils";
import React from "react";
import {CardTitle} from "@/components/CardTitle";
import {getProjectAnalysis} from "@/utils/project-utils";

const COLUMNS = [
    {
        name: "ID"
    },
    {
        name: "Question"
    },
    {
        name: "Initial"
    },
    {
        name: "Final "
    },
    {
        name: "+/- (%)"
    }
]


type Props = {
    projectId: number;
}

export default async function ProjectAnalysisTable(props: Props) {
    await waitRandomTime();
    const analysis = await getProjectAnalysis(props.projectId);

    const rows = analysis.map((analysisRow, index) => {
        return [
            <div key={index}>{analysisRow.id}</div>,

            <div key={index} className={`max-w-md`}>{analysisRow.question}</div>,

            getScorecard(analysisRow.totalInitialCount, analysisRow.averageInitialScore),

            getScorecard(analysisRow.totalFinalCount, analysisRow.averageFinalScore),

            getChange(analysisRow.change, analysisRow.averageInitialScore, analysisRow.averageFinalScore)
        ];
    });

    return (
        <div className={`p-1 rounded-md bg-white h-fit w-full md:w-[800px] shadow-md`}>

            <CardTitle title={`Responses Analysis`} color={`blue`}/>
            <Table columns={COLUMNS} rows={rows}/>

        </div>

    );
}

function getScorecard(count: number, score: number) {
    if (isNaN(count)) {
        return <div className={`text-gray-500`}>-</div>
    }

    return (
        <div className={`flex flex-row space-x-2`}>
            <div className={`font-bold w-8`}>{score.toFixed(2)}</div>
            <div className={`w-4 font-light`}>({count})</div>
        </div>
    )
}

function getChange(change: number, initial: number, final: number) {
    if (isNaN(change)) {
        return <div className={`text-gray-400`}>-</div>
    }

    const changePercentage = ((final - initial) / initial * 100).toFixed(2);

    return (
        <div className={`flex flex-row space-x-2`}>
            { change < 0 && <div className={`font-bold w-4 text-red-600`}>{change.toFixed(2)} <span
                className={'font-light text-[10px]'}>({changePercentage}%)</span></div>}
            {change > 0 && <div className={`font-bold w-4 text-green-600`}>+{change.toFixed(2)} <span
                className={'font-light text-[10px]'}>({changePercentage}%)</span></div>}
            {change == 0 && <div className={`font-bold w-4 text-gray-400`}>-</div> }
        </div>
    )
}