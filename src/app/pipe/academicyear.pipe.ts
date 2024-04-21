import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'academicyear'
})
export class AcademicyearPipe implements PipeTransform {

  transform(date:Date): string {
    const currentYear = date.getFullYear();
    console.log(currentYear);
    const nextYear = currentYear + 1;
    console.log(nextYear);
    const formatYear = `${currentYear.toString().slice(-2)}-${nextYear.toString().slice(-2)}`;
    console.log(formatYear);
    return formatYear;
  }

}
