import Header from "./elements/header/header";

export default class App {
  goals;
  tasks;
  header;
  main;

  constructor() {
    this.header = new Header();
  }
}
