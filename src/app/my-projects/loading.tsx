import ProjectBoxSkeleton from "@/components/ProjectBoxSkeleton";
import Heading from "@/components/Heading";

export default async function ProjectSelectorLoading() {
    return (
        <div className={`flex flex-col pt-5 w-full space-y-10 max-w-md animate-pulse`}>
            <Heading>Select your project</Heading>
            <ProjectBoxSkeleton/>

        </div>
    );
}
