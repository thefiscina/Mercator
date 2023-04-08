import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective  {

  constructor(private elementRef: ElementRef) { };

  ngOnInit(): void {
    console.log('teste')
    this.elementRef.nativeElement.focus();
  }
}
