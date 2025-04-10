'use client';

import { FC } from 'react';
import { Modal } from '@/components/modal/modal';

type Props = {
  recentMeals: Meal[];
  close: () => void;
  isOpen: boolean;
  onClickMeal: (meal: Meal) => void;
};

export const RecentMealsModal: FC<Props> = ({
  recentMeals,
  close,
  isOpen,
  onClickMeal,
}) => {
  return (
    <Modal close={close} isOpen={isOpen}>
      <h2 className="mb-24px text-center text-xl font-bold">
        最近の食べたもの
      </h2>
      <ul>
        {recentMeals.map((meal) => (
          <li key={meal.id}>
            <button
              onClick={() => {
                onClickMeal(meal);
                close();
              }}
            >
              {meal.name}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};
