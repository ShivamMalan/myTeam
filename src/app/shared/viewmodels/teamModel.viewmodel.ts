export class TeamModel {
  static factory(data: TeamModel): TeamModel {
    const viewModel = Object.assign(new TeamModel(), data);
    return viewModel;
  }
  playerName: string= "Player Name";
  playerImage: string="Player Image";
  jerseyNumber: string="Jersey Number";
  position: string="Position";
  height: string="Height";
  weight: string="Weight";
  nationality: string="Nationality";
  flag: string="Flag";
  starter: string="Starter";
  appearances: string="Appearances";
  minutesPlayed: string="MinutesPlayed";
  goals: string="Goals";
  assists: string="Assists";
  cleanSheets: string="CleanSheets";
  saves: string="Saves";
}