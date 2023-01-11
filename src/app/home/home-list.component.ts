import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TeamModel } from 'src/app/shared/viewmodels/teamModel.viewmodel';
import { Team } from 'src/app/shared/viewmodels/team.viewmodel';
import { SummaryComponent } from '../summary/summary.component';
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, OnDestroy {
  players: any[]=[]
  playerData: any[] = [];
  @ViewChild('data') data:any;
  @ViewChild('fav') fav:any;
  @ViewChild('sum') sum:any;
  step=1
  covidData: any[] = [];
  headerRow: any[] = [];
  entry!: ViewContainerRef;
  sub!: Subscription;
  modalOpened:boolean=false;
  error:string=""
  form:any
  team=new Team()
  expanded:any
  toggle:boolean=false
  constructor() {
    this.form={valid:false}

  }

  ngOnInit() {
    let players:TeamModel = new TeamModel();
    this.players.push(players)
    console.log("playerData ",this.playerData)
  }
  openModal() {
    this.modalOpened=true;
  }
  closeModal(){
    this.data.reset();
    this.form.reset();
    this.form.removeControl('favPlayer');
    this.modalOpened=false;
    this.step=1
  }
  continue(){
    if(this.step<3){
    this.step+=1;
    if(this.step==2){
      this.form.addControl('favPlayer',new FormControl('', Validators.required))
    }
    }
    else{
      this.sum.submit()
      this.closeModal()
    }
  }
  return(){
    if(this.step>1){
    this.step-=1
    if(this.step==1 && !this.form.valid){
      this.form.removeControl('favPlayer');
    }
    }
  }
  playerDataCall(playerData:any[]){
    console.log(playerData)
    this.playerData=playerData
  }
  errorText(error:string){
    this.error=error
  }
  teamForm(form:any){
    this.form=form;
    console.log(form.dirty,form.valid,form.value, form)
  }
  teamData(team:Team){
    this.team=team
  }
  expand(record:any,toggle:boolean){
    this.toggle=!this.toggle
    if(this.toggle){
      this.expanded=record
    }else{
      this.expanded=null
    }
  }
  
  ngOnDestroy(): void {
    if (this.sub){
      this.modalOpened=false;
      this.sub.unsubscribe();
    } 
  }
}

