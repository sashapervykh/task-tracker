export default class Goal {
  description;
  deadline;
  status;
  constructor({ description, deadline, status }) {
    this.description = description;
    this.deadline = deadline;
    this.status = status;
  }
}
