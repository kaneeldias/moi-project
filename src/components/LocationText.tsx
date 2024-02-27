import React from "react";
import {waitRandomTime} from "@/utils/test-utils";
import {getLocation} from "@/utils/opportunity-utils";

type Props = {
    opportunityId: number;
}

export default async function LocationText(props: Props) {
    await waitRandomTime();

    let location;
    try {
        location = await getLocation(props.opportunityId);
    } catch (e) {
        location = "Unknown";
    }

    return (
        <div>
            {location}
        </div>
    );
}
