export class Step {

    constructor(
        public name: string,
        public command: string,
        public status: string,
        public lastRun?: string | null, 
        public localPath?: string,
        public nextRun?: string,
        public lastResult?: string,
        public projectTaskId?: number,
        public id?: number
    ){} 
}