export interface Pokemon {
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
