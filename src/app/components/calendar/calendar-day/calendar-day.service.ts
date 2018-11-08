import { Injectable } from '@angular/core';

@Injectable()
export class CalendarDayService {

    constructor() {

    }

    getAlertsByDay(year: number, month: number, day: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getAllAlerts()
            .then((res:any) => {
                let dayAlerts = res.filter(x => x.year == year && x.month == month && x.day == day);
                resolve(dayAlerts);
            });
         });
    }

    getAllAlerts(): Promise<any> {
        return new Promise((resolve, reject) => {
           let schedule = JSON.parse(localStorage.getItem('schedule'));
           resolve((schedule || []));
        });
    }

}