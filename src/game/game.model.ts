import * as _ from 'lodash';

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
    let baseNameEl: GameName = _.find(this.gamenames, (el: GameName): boolean => {
      return el.alias === 'base';
    });
    if (false === _.isUndefined(baseNameEl)) {
      return baseNameEl.name;
    } else {
      return '';
    }
  };

  getNonRepNames(): GameName[] {
    return _.filter(this.gamenames, (el: GameName): boolean => {
      return el.alias !== 'base';
    });
  };

  getPossibleNewMarketsForTerm(): string[] {
    return _.differenceWith(MARKETS, this.searchTerms, (el1: string, el2: SearchTerm): boolean => {
      return el2.market === el1;
    });
  };

  getPossibleNewMarketsForURL(): string[] {
    return _.differenceWith(MARKETS, this.urls, (el1: string, el2: GamePage): boolean => {
      return el2.market === el1;
    });
  };
};

export const MARKETS: string[] = [
  'DiveDice', 'BoardLife', 'BoardPia',
  'Amazon', 'CardCastle', 'Cardhaus',
  'CoolStuffInc', 'MiniatureMarket', 'PopcornEdu'
];