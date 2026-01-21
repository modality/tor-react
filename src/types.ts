export interface StringMap {
  [index: string]: string;
}

// export type Face string

export type Roll = {
  id: number;
  label: string;
  featIndex: number;
  featDice: number;
  successDice: number;
  featFaces: string[];
  successFaces: string[];
  gandalf: boolean;
  sum: number;
  wearySum: number;
  successIcons: number;
};
