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

};

export const MARKETS: string[] = [
  'DiveDice', 'BoardLife', 'BoardPia',
  'Amazon', 'CardCastle', 'Cardhaus',
  'CoolStuffInc', 'MiniatureMarket', 'PopcornEdu'
];


export function getRepName(game: Game): string {
  let baseNameEl: GameName = _.find(_.get(game, 'gamenames', []), (el: GameName): boolean => {
    return el.alias === 'base';
  });
  if (false === _.isUndefined(baseNameEl)) {
    return baseNameEl.name;
  } else {
    return '';
  }
};

export function getNonRepNames(game: Game): GameName[] {
  return _.filter(_.get(game, 'gamenames', []), (el: GameName): boolean => {
    return el.alias !== 'base';
  });
};

export function getPossibleNewMarketsForTerm(game: Game): string[] {
  return _.differenceWith(MARKETS, _.get(game, 'searchTerms', []), (el1: string, el2: SearchTerm): boolean => {
    return el2.market === el1;
  });
};

export function getPossibleNewMarketsForURL(game: Game): string[] {
  return _.differenceWith(MARKETS, _.get(game, 'urls', []), (el1: string, el2: GamePage): boolean => {
    return el2.market === el1;
  });
};