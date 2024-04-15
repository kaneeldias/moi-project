import Image from 'next/image'
import Link from "next/link";
import {getOpportunity} from "@/utils/opportunity-utils";
import {waitRandomTime} from "@/utils/test-utils";
import HostEntityChip from "@/components/chips/HostEntityChip";
import {getProjectLogo} from "@/utils/img-utils";

type Props = {
    opportunityId: number;
}

export default async function OpportunityBox(props: Props) {
    await waitRandomTime();
    const opportunity = await getOpportunity(props.opportunityId);
    const projectLogo = getProjectLogo(opportunity.name, opportunity.sdg);

    return (
        <div className={`flex flex-row h-fit w-full md:w-fit mt-5`}>
              {/*href={`/opportunities/${opportunity.id}`}>*/}
            <div
                className={"flex flex-row bg-white rounded-md shadow-md text-gray-800 h-24 md:min-w-[400px] w-full md:w-fit"}>
                <div className={`h-96`}>
                    <Image className={`rounded-l-md`} src={projectLogo}
                           width={96}
                           height={96}
                           priority={true}
                           alt={`Sustainable development goal for project ${opportunity.name}`}
                    />
                </div>
                <div className={`flex flex-col pl-5 space-y-5 justify-center`}>
                    <div className={`flex flex-col space-y-2`}>
                        <div className={`text-2xl font-bold text-gray-700`}>{opportunity.name}</div>
                        <HostEntityChip opportunityId={opportunity.id}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
