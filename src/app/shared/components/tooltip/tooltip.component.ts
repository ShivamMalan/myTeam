import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'tm-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class Tooltip {

  @ViewChild("TooltipBody") TooltipBody!: { nativeElement: { children: Iterable<HTMLElement> | ArrayLike<HTMLElement>; }; };
  
  

  Status: string | undefined;

  @Input()
  visible = true;

  @Input()
  marginBottom = 0;

  @Input()
  message = '...';

  @Input()
  isSmall = false;

  @Input()
  isAppLevel = false;

  @Input()
  isCloseable = false;

  @Input()
  showOnError = false;
}
