export class ProjectTask  {
    constructor(
      public id: number,
      public title: string,
      public date: string,
      public daysLeft: number,
      public description: string,
      public progress: number,
      public backgroundColor: string,
      public projectId?: number,
    ) {}
  }
  