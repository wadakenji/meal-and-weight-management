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
      <ul className="flex flex-wrap gap-8px *:basis-[calc((100%-8px)/2)]">
        {recentMeals.map((meal) => (
          <li
            key={meal.id}
            className="min-h-min-button-size rounded border border-line"
          >
            <button
              onClick={() => {
                onClickMeal(meal);
                close();
              }}
              className="flex size-full flex-col items-center justify-between p-16px"
            >
              <span className="mb-8px text-lg font-bold">{meal.name}</span>
              <span className="text-text-gray">
                <span className="">{meal.amountOfEnergy}</span>
                <span className="text-sm"> kcal</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};
