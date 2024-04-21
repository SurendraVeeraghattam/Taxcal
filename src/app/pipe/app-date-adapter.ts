import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Injectable()
export class AppDateAdapter extends MomentDateAdapter{

    override format(date:moment.Moment, dateFormat: string): any {
        if(dateFormat === 'yy-y'){
            const StartYear = date.year();
            const endYear = StartYear + 1;
            return `${StartYear.toString().slice(-2)}-${endYear.toString().slice(-2)}`;
        } else {
            console.log(date, dateFormat);
            return super.format(date, dateFormat);
        }
    }
}