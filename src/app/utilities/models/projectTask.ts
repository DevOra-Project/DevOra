export class ProjectTask  {
    constructor(
      public title: string,
      public date: string,
      public daysLeft: number,
      public description: string,
      public progress: number,
      public imageUrl: string,
      public backgroundColor: string,
    ) {}
  }
  