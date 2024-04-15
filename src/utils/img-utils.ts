const ACCEPTED_PROJECTS = [
    "Equify",
    "Global Classroom",
    "Green Leaders",
    "On the Map",
    "Raise Your Voice",
    "Skill Up!"
];

export function getProjectLogo(name: string, sdg: number): string {
    if (ACCEPTED_PROJECTS.includes(name)) {
        return `/project_logos/${name}.png`;
    }
    return `/sdg_logos/${sdg}.png`;
}