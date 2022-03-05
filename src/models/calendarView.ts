export interface IMatch {
  id: number;
  utcDate: string;
  status: string;
  homeTeam: {
    name: string;
  };
  awayTeam: {
    name: string;
  };
  score: {
    fullTime: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
    extraTime: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
    penalties: {
      homeTeam: number | null;
      awayTeam: number | null;
    };
  };
}

export interface IMatchesResponse {
  count: number;
  matches: IMatch[];
}

export interface ICalendarItitialState {
  matches: IMatch[];
  matchesNum: number;
}
