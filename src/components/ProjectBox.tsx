import Image from 'next/image'
import Link from "next/link";
import {waitRandomTime} from "@/utils/test-utils";
import {getProject} from "@/utils/project-utils";
import {getProjectLogo} from "@/utils/img-utils";

type Props = {
    projectId: number;
}

export default async function ProjectBox(props: Props) {
    await waitRandomTime();
    const project = await getProject(props.projectId);
    const projectLogo = getProjectLogo(project.name, project.sdg);


    return (
        <Link className={`flex flex-row h-fit w-full md:w-fit mt-5`}
              href={`/projects/${project.id}`}>
            <div
                className={"flex flex-row bg-white rounded-md shadow-md text-gray-800 h-24 md:min-w-[400px] w-full md:w-fit"}>
                <div className={`h-96`}>
                    <Image className={`rounded-l-md`} src={projectLogo}
                           width={96}
                           height={96}
                           priority={true}
                           alt={`Sustainable development goal for project ${project.name}`}
                    />
                </div>
                <div className={`flex flex-col pl-5 space-y-5 justify-center`}>
                    <div className={`flex flex-col space-y-2`}>
                        <div className={`text-2xl font-bold text-gray-700`}>{project.name}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
