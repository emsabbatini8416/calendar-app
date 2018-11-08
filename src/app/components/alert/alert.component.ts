import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './alert.service';


@Component({
    selector: 'alert-component',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    providers: [AlertService]
})

export class AlertComponent {

    @Input() model: any;

    alert: any = {
        title: '',
        from: '',
        to: '',
        color: ''
    };

    constructor(public activeModal: NgbActiveModal, private alertSvc: AlertService) {

    }

    ngOnInit() {
        console.log(this.model)
        if (this.model.alertEditMode) {
            let dateFrom = new Date(this.model.alert.from);
            let dateTo = new Date(this.model.alert.to);
            this.alert.title = this.model.alert.title;
            this.alert.from = dateFrom.getHours() + ':' + dateFrom.getMinutes(); 
            this.alert.to = dateTo.getHours() + ':' + dateTo.getMinutes();
            this.alert.color = this.model.alert.color;
        }
    }

    onSave() {
        let from = new Date(this.model.alertDay.year,
                            this.model.alertDay.month,
                            this.model.alertDay.day,
                            this.alert.from.split(':')[0],
                            this.alert.from.split(':')[1],
                            0,0).getTime();

        let to = new Date(this.model.alertDay.year,
                                this.model.alertDay.month,
                                this.model.alertDay.day,
                                this.alert.to.split(':')[0],
                                this.alert.to.split(':')[1],
                                0,0).getTime();     

        if(!this.model.alertEditMode){
            this.alertSvc.setAlert(this.model.alertDay.year,
                                    this.model.alertDay.month,
                                    this.model.alertDay.day,
                                    this.alert.title,
                                    from,
                                    to,
                                    this.alert.color)
            .then((res:any) => {
                this.activeModal.close(true)
            });
        } else {
            this.alertSvc.editAlert(this.model.alert.id,
                                    this.model.alertDay.year,
                                    this.model.alertDay.month,
                                    this.model.alertDay.day,
                                    this.alert.title,
                                    from,
                                    to,
                                    this.alert.color)
            .then((res:any) => {
                this.activeModal.close(true)
            });
        }
    }

}