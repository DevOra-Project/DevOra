export class Project {
    constructor(
        public name: string,
        public description: string,
        public language?: string,
        public languageColor?: string,
        public localPath?: string,
    ) {}
}
