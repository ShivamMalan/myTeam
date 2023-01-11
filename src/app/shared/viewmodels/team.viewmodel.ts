import { TeamModel } from 'src/app/shared/viewmodels/teamModel.viewmodel';
export class Team{
    teamName!:string;
    team= new Array<TeamModel>();
    favPlayer!:string;
}