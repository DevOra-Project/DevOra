export class Notification {
  constructor(
    public id: number | null,
    public message: string,
    public timestamp: Date,
    public seen: boolean,
    public type: string,
    public userID?: number | null,
    public projectID?: number | null
  ) {}
}
