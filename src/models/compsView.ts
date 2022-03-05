export interface IComp {
  name: string;
  id: number;
  area: {
    name: string;
  };
}

export interface ICompsResponse {
  count: number;
  competitions: IComp[];
}

export interface ICompsInitialState {
  comps: IComp[];
  compsNum: number;
}
