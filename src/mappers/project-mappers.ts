import {Project} from "@/types/project-types";

export function mapProject(response: any): Project {
    return {
        id: response.id,
        name: response.opportunity.title,
        location: response.opportunity.location,
        sdg: response.opportunity.sdg_info.sdg_target.goal_index,
        startDate: new Date(response.slot.start_date),
        endDate: new Date(response.slot.end_date)
    }
}