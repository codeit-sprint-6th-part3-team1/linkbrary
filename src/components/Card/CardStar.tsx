import React, { FC, ReactElement, ReactNode } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import CardStarFalse from './asset/CardStarFalseIcon';
import CardStarTrue from './asset/CardStarTrueIcon';
=======
import CardStarFalse from '../../../public/assets/Card/CardStarFalseIcon';
import CardStarTrue from '../../../public/assets/Card/CardStarTrueIcon';
>>>>>>> main
=======
import CardStarFalse from './asset/CardStarFalseIcon';
import CardStarTrue from './asset/CardStarTrueIcon';
>>>>>>> a246fcbaf6d9013f2ef70341543812f83b4e5a56

interface StarProps {
  addFavorites: boolean;
}

const CardStar = ({ addFavorites }: StarProps): ReactElement => {
  return <>{addFavorites ? <CardStarTrue /> : <CardStarFalse />}</>;
};

export default CardStar;
