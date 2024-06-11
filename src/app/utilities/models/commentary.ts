
export class Commentary {

    constructor(
        public pipelineId:number,
        public user:string,
        public message:string,
        public timestamp:Date = new Date(),
        public id?: number
    ){
        
    }
}