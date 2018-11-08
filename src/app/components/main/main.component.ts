import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  model: NgbDateStruct;

  selectYear: number;
  selectMonth: number;
  selectDay: number;

  constructor(private calendar: NgbCalendar) { 
    this.model = this.calendar.getToday();
    this.setCalendar(this.model);
  }

  ngOnInit() {
   
  }
  onDateSelect(event) {
    this.setCalendar(event);
  }

  private setCalendar(model) {
    this.selectYear = model.year;
    this.selectMonth = model.month;
    this.selectDay = model.day;
  }
}