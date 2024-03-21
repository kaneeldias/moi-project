import React, {useEffect} from "react";
import {waitRandomTime} from "@/utils/test-utils";
import {getLocation} from "@/utils/opportunity-utils";

type Props = {
    opportunityId: number;
}

export default function LocationText(props: Props) {
    const [location, setLocation] = React.useState<string>("Unknown");
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        fetch(`/api/opportunities/${props.opportunityId}/location`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(
            response => response.json()
        ).then(json => {
            setLocation(json);
            setLoading(false);
        })
    }, []);

    return (
        <div>
            {loading ? <div className={`flex h-2.5 flex-row space-x-1 items-center bg-gray-400 rounded-full dark:bg-gray p-1 px-2 w-28`}/>: location}
        </div>
    );
}
