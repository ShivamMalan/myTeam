import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Team } from 'src/app/shared/viewmodels/team.viewmodel';
@Component({
  selector: 'tm-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() step= 0;
  @Input() playerData:any[]=[]
  @Input() form!:FormGroup
  team=new Team();
  @Output() teamChanged: EventEmitter<Team>=new EventEmitter<Team>()
  Goalkeepers=0
  Defenders=0
  Midfielders=0
  Forwards=0
  constructor(){
  }
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.step==3){
      this.Goalkeepers=this.playerData.filter((obj)=> obj.position ==='Goalkeeper').length
      this.Defenders=this.playerData.filter((obj)=> obj.position ==='Defender').length
      this.Midfielders=this.playerData.filter((obj)=> obj.position ==='Midfielder').length
      this.Forwards=this.playerData.filter((obj)=> obj.position ==='Forward').length
    }
  }
  submit(){
    if(this.step==3){
        this.team.teamName=this.form.controls['teamName'].value
        this.team.team=this.playerData
        this.team.favPlayer=this.form.controls['favPlayer'].value
        console.log(this.team)
        this.teamChanged.emit(this.team)
  }
  }
}
