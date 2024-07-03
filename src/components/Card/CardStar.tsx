import React, { FC, ReactElement, ReactNode } from 'react';
import CardStarFalse from './asset/CardStarFalseIcon';
import CardStarTrue from './asset/CardStarTrueIcon';

interface StarProps {
  addFavorites: boolean;
}

const CardStar = ({ addFavorites }: StarProps): ReactElement => {
  return <>{addFavorites ? <CardStarTrue /> : <CardStarFalse />}</>;
};

export default CardStar;
