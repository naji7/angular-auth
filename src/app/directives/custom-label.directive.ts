import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomLabel]',
  standalone: true,
})
export class CustomLabelDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.fontWeight = 'bold';
    el.nativeElement.style.color = 'blue';
  }

  // ngOnInit() {
  //   this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  //   this.renderer.setStyle(this.el.nativeElement, 'color', 'blue');
  // }
}
