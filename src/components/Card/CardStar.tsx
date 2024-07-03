import React, { FC, ReactElement, ReactNode } from 'react';
import CardStarFalse from '../../../public/assets/card/CardStarFalseIcon';
import CardStarTrue from '../../../public/assets/card/CardStarTrueIcon';

interface StarProps {
  addFavorites: boolean;
}

const CardStar = ({ addFavorites }: StarProps): ReactElement => {
  return <>{addFavorites ? <CardStarTrue /> : <CardStarFalse />}</>;
};

export default CardStar;
