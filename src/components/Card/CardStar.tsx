import React, { FC, ReactElement, ReactNode } from 'react';
import CardStarFalse from '../../../public/assets/Card/CardStarFalseIcon';
import CardStarTrue from '../../../public/assets/Card/CardStarTrueIcon';

interface StarProps {
  addFavorites: boolean;
}

const CardStar = ({ addFavorites }: StarProps): ReactElement => {
  return <>{addFavorites ? <CardStarTrue /> : <CardStarFalse />}</>;
};

export default CardStar;