import { FC } from 'react';
import { MealForm } from '@/components/form/meal-form/meal-form';
import { WeightForm } from '@/components/form/weight-form/weight-form';
import { StepForm } from '@/components/form/step-form/step-form';

const Page: FC = () => {
  return (
    <main>
      <section>
        <h2>食事登録</h2>
        <MealForm />
      </section>
      <section>
        <h2>体重登録</h2>
        <WeightForm />
      </section>
      <section>
        <h2>歩数登録</h2>
        <StepForm />
      </section>
    </main>
  );
};

export default Page;
