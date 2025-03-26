export interface IRace {
  id: string;
  name: string;
  participants: IParticipant[];
}

export interface IParticipant {
  name: string;
  lane: string;
  rank: string;
}
