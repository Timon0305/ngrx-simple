import {TodoModel} from "./todo.model";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {SumAction} from "./todo.action";


export interface TodoStateModel {
  sumModel: TodoModel[],
  sum: number;
}

@State<TodoStateModel>({
  name: 'sum',
  defaults: {
    sumModel: [],
    sum: 0
  }
})

@Injectable()
export class TodoState {
  constructor(
  ) {}

  @Selector()
  static getValue(state: TodoStateModel) {
    return state.sum
  }

  @Action(SumAction)
  sumAction({getState, setState}: StateContext<TodoStateModel>, {payload}: SumAction){
    let state = getState();
    let sum = payload.first + payload.second;
    setState({
      ...state,
      sum: sum
    })
  }
}
