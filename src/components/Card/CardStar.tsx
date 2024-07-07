import type { ReactElement } from 'react';
import React from 'react';

import CardStarFalse from '../../../public/assets/card/CardStarFalseIcon';
import CardStarTrue from '../../../public/assets/card/CardStarTrueIcon';

interface StarProps {
  addFavorites: boolean;
}

const CardStar = ({ addFavorites }: StarProps): ReactElement => (addFavorites ? <CardStarTrue /> : <CardStarFalse />);

export default CardStar;
