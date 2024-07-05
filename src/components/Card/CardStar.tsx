import React, { FC, ReactElement, ReactNode } from 'react';
<<<<<<< HEAD
import CardStarFalse from './asset/CardStarFalseIcon';
import CardStarTrue from './asset/CardStarTrueIcon';
=======
import CardStarFalse from '../../../public/assets/Card/CardStarFalseIcon';
import CardStarTrue from '../../../public/assets/Card/CardStarTrueIcon';
>>>>>>> main

interface StarProps {
  addFavorites: boolean;
}

const CardStar = ({ addFavorites }: StarProps): ReactElement => {
  return <>{addFavorites ? <CardStarTrue /> : <CardStarFalse />}</>;
};

export default CardStar;
