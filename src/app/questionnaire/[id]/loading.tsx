import ProjectBoxSkeleton from "@/components/ProjectBoxSkeleton";
import QuestionnaireSkeleton from "@/components/questions/QuestionnaireSkeleton";

export default async function LoadingSkeleton() {
    return (
        <div
            className={`flex flex-col md:flex-row md:space-x-5 pt-5 w-full space-y-10 md:space-y-0 max-w-2xl md:max-w-fit`}>
            <ProjectBoxSkeleton/>
            <QuestionnaireSkeleton/>
        </div>
    );
}
