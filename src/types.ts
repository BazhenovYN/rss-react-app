export type QueryParam = {
  key: string;
  value: string | number;
};

export type EmptyObject = Record<string, never>;

export interface IPeople {
  id: number;
  name: string;
  height: string;
  mass: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
}

export interface IDataFragment {
  totalCount: number;
  results: IPeople[];
}
