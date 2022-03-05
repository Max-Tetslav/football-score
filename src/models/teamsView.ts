export interface ITeam {
  id: number;
  name: string;
  crestUrl: string;
}

export interface ITeamsResponse {
  count: number;
  teams: ITeam[];
}

export interface ITeamsInitialState {
  teams: ITeam[];
  teamsNum: number;
}
