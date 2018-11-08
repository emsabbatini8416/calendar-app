import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {

    constructor() {

    }

    setAlert(year, month, day, title, from, to, color): Promise<any> {
        return new Promise((resolve, reject) => {
            let schelude = JSON.parse(localStorage.getItem('schedule'));
            schelude = schelude || [];
            schelude.push({
                id: this.newGuid(),
                year: year,
                month: month,
                day: day,
                title: title,
                from: from,
                to: to,
                color: color
            });
            localStorage.setItem('schedule', JSON.stringify(schelude));
            resolve(true);
        });
    }

    editAlert(id, year, month, day, title, from, to, color): Promise<any> {
        return new Promise((resolve, reject) => {
            let schelude = JSON.parse(localStorage.getItem('schedule'));
            schelude = schelude.splice(schelude.findIndex(x => x.id == id), 1);
            schelude.push({
                id: this.newGuid(),
                year: year,
                month: month,
                day: day,
                title: title,
                from: from,
                to: to,
                color: color
            });
            localStorage.setItem('schedule', JSON.stringify(schelude));
            resolve(true);
        });
    }

    private newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

}