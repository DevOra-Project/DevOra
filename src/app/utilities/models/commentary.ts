import { User } from "./user";

export class Commentary {

    constructor(
      
        public user:User|string,

        public message:string,
        public timestamp:Date = new Date(),
        public stepId:number,
        public userId?:number,
        public id?: number
    ){}
}