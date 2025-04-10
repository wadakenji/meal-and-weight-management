import { ChangeEvent, useState } from 'react';
import { dateToDatetimeInputValue } from '@/utils/date';

export const useMealRegisterForm = () => {
  const today = new Date();

  const [datetime, setDatetime] = useState(dateToDatetimeInputValue(today));
  const [name, setName] = useState('');
  const [energy, setEnergy] = useState('');
  const [protein, setProtein] = useState('');

  const onChangeDatetime = (e: ChangeEvent<HTMLInputElement>) =>
    setDatetime(e.target.value);
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onChangeEnergy = (e: ChangeEvent<HTMLInputElement>) =>
    setEnergy(e.target.value);
  const onChangeProtein = (e: ChangeEvent<HTMLInputElement>) =>
    setProtein(e.target.value);

  const setMeal = (meal: Meal) => {
    setName(meal.name);
    setEnergy(String(meal.amountOfEnergy));
    if (meal.amountOfProtein && meal.amountOfProtein > 0)
      setProtein(String(meal.amountOfProtein));
    else setProtein('');
  };

  const clearForm = () => {
    setName('');
    setEnergy('');
    setProtein('');
  };

  return {
    datetime,
    name,
    energy,
    protein,
    setMeal,
    clearForm,
    onChangeDatetime,
    onChangeName,
    onChangeEnergy,
    onChangeProtein,
  };
};
