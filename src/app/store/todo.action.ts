import {TodoModel} from "./todo.model";

export class SumAction {
  static readonly type = '[Sum] Fetch Sum';
  constructor(public payload: any) {}
}
