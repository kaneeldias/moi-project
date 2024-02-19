import SideBarIcon from "@/components/SideBarIcon";

export default function SideBar() {

    return (
        <div className={`flex flex-col space-y-7 mt-2`}>
            <SideBarIcon photo="/sidebar_icons/sdg_wheel.png" text="Projects" link={`${process.env.NEXT_PUBLIC_BASE_URL}/projects`}/>
            <SideBarIcon photo="/sidebar_icons/gv_logo.png" text="Opportunities" link={`${process.env.NEXT_PUBLIC_BASE_URL}/opportunities`}/>
            <SideBarIcon photo="/sidebar_icons/survey.png" text="Survey responses" link={`${process.env.NEXT_PUBLIC_BASE_URL}/survey-responses`}/>
        </div>
    );
}
