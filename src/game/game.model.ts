export class GameName {
  alias: string;
  name: string;
};

export class SearchTerm {
  market: string;
  terms: string[];
};

export class GamePage {
  market: string;
  url: string;
};

export class Game {
  id: string;
  name: string;
  gamenames: GameName[];
  searchTerms: SearchTerm[];
  urls: GamePage[];

  getRepName(): string {
    let baseNameEl = this.gamenames.find((el) => {
      return el.alias === 'base';
    });
    if (typeof baseNameEl !== 'undefined') {
      return baseNameEl.name;
    } else {
      return '';
    }
  };
};
