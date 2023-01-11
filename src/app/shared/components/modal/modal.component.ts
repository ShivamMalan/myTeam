import {Component,Input,OnInit,Output,EventEmitter,OnDestroy,ViewChild,} from '@angular/core';
  
  @Component({
    selector: 'tm-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
  })
  export class ModalComponent implements OnInit, OnDestroy {
    constructor() {}
    @Input() tmModalOpen:boolean=false;
    @Input() title: string = '';
    @Input() body: string ='';
    @ViewChild("ModelBody") ModelBody!: { nativeElement: { children: Iterable<HTMLElement> | ArrayLike<HTMLElement>; }; };
    @Output() tmModalOpenChange:EventEmitter<boolean> = new EventEmitter<boolean>();
    ngOnInit(): void {
      console.log('Modal init');
    }

  
    closeModal() {
      this.tmModalOpen=false
      this.tmModalOpenChange.emit(this.tmModalOpen);
    }
    ngOnDestroy(): void {
      console.log(' Modal destroyed');
    }
  }