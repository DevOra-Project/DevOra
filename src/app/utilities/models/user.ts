
import { ProjectProgress } from './project-progress';

export class User {
    constructor(
        public id: number,
        public name: string,
        public profileImage: string,
        public description: string,
        public posts: number,
        public commits: number,
        public messages: number,
        public invites: number,
        public events: number,
        public statistics: any,
        public projectsProgress: ProjectProgress[]
    ) {}
}
