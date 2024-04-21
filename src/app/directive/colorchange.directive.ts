import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColorchange]'
})
export class ColorchangeDirective {

  private originalValue!: String;
  @Input() appValueChange : any; 

  constructor(private ElRef:ElementRef) { }
  
  
  ngAfterViewInit() {
  this.originalValue = this.appValueChange;
  }
  
  @HostListener('input') onInput() {
  const currentValue = this.ElRef.nativeElement.value;
  if (currentValue !== this.originalValue) {
  this.ElRef.nativeElement.style.backgroundColor = 'yellow';
  } else {
  this.ElRef.nativeElement.style.backgroundColor = null;
   }
  }
}
