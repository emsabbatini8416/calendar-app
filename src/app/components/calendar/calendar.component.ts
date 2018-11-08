import { Component, Input, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() year: number;
  @Input() month: number;
  @Input() day: number;

  calendarMonth: Array<any> = [];
  calendarWeek: Array<any> = [];
  calendarDays: Array<any> = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday',
    'Saturday'
  ];

  constructor() { 
  }

  ngOnChanges(changes: SimpleChanges) {
    // In this moment is not necessary verify previous values
    this.getMonthDays();
  }

  ngOnInit() {
    this.getMonthDays();
  }

  private getMonthDays() {

    this.calendarMonth = [];
    this.calendarWeek = [];

    let totalDays = new Date(this.year, this.month, 0).getDate();

    for(let d = 0; d < totalDays; d++) {
      
      let date = new Date(this.year, (this.month - 1), (d + 1));

      this.calendarWeek[date.getDay()] = {
        year: this.year,
        month: this.month,
        day: date.getDate(),
        isToday: date.getDate() == this.day
      };

      if (date.getDay() == 6) this.addWeekToMonth();
    }

    if (this.calendarWeek.length > 0) this.addWeekToMonth();
  }

  private addWeekToMonth() {
    this.calendarMonth.push(this.calendarWeek);
    this.calendarWeek = [];
  }

}