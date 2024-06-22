export class Step {

    constructor(
        public name: string,
        public command: string,
        public status: string,
        public lastRun: Date,
        public localPath?: string,
        public nextRun?: string,
        public lastResult?: string,
        public id?: number
    ){} 
}