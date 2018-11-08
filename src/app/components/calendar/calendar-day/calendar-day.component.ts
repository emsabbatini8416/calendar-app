import { Component, Input } from '@angular/core';
import { CalendarDayService } from './calendar-day.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './../../alert/alert.component';


@Component({
  selector: 'calendar-day-component',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  providers: [CalendarDayService]
})
export class CalendarDayComponent {

  @Input() day: any;

  alerts: Array<any> = [];

  constructor(private modalSvc: NgbModal,
              private calendarDaySvc: CalendarDayService) { 
  }

  ngOnChanges(){
    this.getAlerts();
  }

  onCreateAlert() {
    const modalRef = this.modalSvc.open(AlertComponent);
    modalRef.componentInstance.model = {
      alertEditMode: false,
      alert: {},
      alertTitle: 'Create Alert',
      alertDay: this.day
    };

    modalRef.result.then((userResponse) => {
      this.getAlerts();
    });
  }

  onEditAlert(alert){
    const modalRef = this.modalSvc.open(AlertComponent);
    modalRef.componentInstance.model = {
      alertEditMode: true,
      alert: alert,
      alertTitle: 'Edit Alert',
      alertDay: this.day
    };

    modalRef.result.then((userResponse) => {
      this.getAlerts();
    });
  }

  private getAlerts(){
    if(!this.day) return; 
    this.calendarDaySvc.getAlertsByDay(this.day.year, this.day.month, this.day.day)
    .then((res:any) => {
      this.alerts = res;
    });
  };
}