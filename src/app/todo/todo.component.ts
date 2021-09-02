import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SumAction} from "../store/todo.action";
import {Select, Store} from "@ngxs/store";
import {TodoState} from "../store/todo.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Select(TodoState.getValue) sumValue: Observable<number> | undefined;
  // @ts-ignore
  sumForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {

  }

  ngOnInit(): void {
    // @ts-ignore
    this.sumValue.subscribe(res => {
      if (res) {
        this.sumForm.patchValue({
          result: res
        })
      }
    });
    this.createForm();
  }

  createForm() {
    this.sumForm = this.formBuilder.group({
      firstNum: ['', Validators.required],
      secondNum: ['', Validators.required],
      result: ['']
    }, { updateOn: "submit" })
  }

  getNumbers = () => {
    let fN = this.sumForm.value.firstNum;
    let sN = this.sumForm.value.secondNum;
    if (fN === '' || sN === '') {
      return
    }
    let value  = {first: fN, second: sN};

    this.store.dispatch(new SumAction(value))
  }
}
