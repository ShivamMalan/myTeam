import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamModel } from 'src/app/shared/viewmodels/teamModel.viewmodel';
@Component({
  selector: 'tm-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit{
  @Input() step= 0;
  @Input() playerData:any[]=[]
  @Input() form!:FormGroup
  favForm!:FormGroup
  expanded:any
  toggle:boolean=false
  @Output() favFormChanged: EventEmitter<any>=new EventEmitter<any>()
  constructor(private fb: FormBuilder) {
    this.favForm=this.fb.group({
      favPlayer:['',Validators.required],
    })
  }

  ngOnInit() {
  }
  
  favorite(player:any){
    this.form.controls['favPlayer'].setValue(player)
    this.favFormChanged.emit(this.form)
    console.log(this.form)
  }
  expand(record:any,toggle:boolean){
    this.toggle=!this.toggle
    if(this.toggle){
      this.expanded=record
    }else{
      this.expanded=null
    }
  }
}