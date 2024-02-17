export default function OpportunityBoxSkeleton() {

    return (
        <div className={`flex flex-row w-full md:w-fit animate-pulse`}>
            <div className={"flex flex-row bg-white rounded-md shadow-md text-gray-800 h-24 md:min-w-[400px] w-full md:w-fit"}>
                <div className={`h-96`}>
                    <div
                        className="flex items-center justify-center w-24 h-24 bg-gray-400 rounded-l-md dark:bg-gray-700">
                    </div>

                </div>
                <div className={`flex flex-col pl-5 space-y-1 justify-center items-center`}>
                    <div>
                        <div className={"h-4 bg-gray-400 rounded-full dark:bg-gray-700 w-64 mb-4"}></div>
                        <div className={"h-2 bg-gray-400 rounded-full dark:bg-gray-700 w-32"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
