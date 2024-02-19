import { Priority } from "../enums/priority";

export default interface ITask {
  name: string;
  created: Date;
  readiness: boolean;
  description: string;
  priority: Priority;
}
