import { Injectable } from '@angular/core';
import {field} from "../components/field/field";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

    field1: field;    //Ссылка на поле 1 игрока
    field2: field;    //Ссылка на поле 2 игрока

  constructor() { }
}