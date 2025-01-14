import Header from "./elements/header/header";
import Main from "./elements/main/main";

export default class App {
  goals;
  tasks;
  header;
  main;

  constructor() {
    this.header = new Header();
    this.main = new Main(this.goals);
  }
}
