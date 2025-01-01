import { FC } from 'react';
import { MealForm } from '@/components/form/meal-form/meal-form';
import { WeightForm } from '@/components/form/weight-form/weight-form';
import { StepForm } from '@/components/form/step-form/step-form';
import { AuthenticatedTemplate } from '@/components/template/authenticated-template/authenticated-template';

const Page: FC = () => {
  return (
    <AuthenticatedTemplate pageTitle="データ登録">
      <section className="mb-24px">
        <h2 className="mb-8px font-bold">食事登録</h2>
        <MealForm />
      </section>
      <section className="mb-24px">
        <h2 className="mb-8px font-bold">体重登録</h2>
        <WeightForm />
      </section>
      <section>
        <h2 className="mb-8px font-bold">歩数登録</h2>
        <StepForm />
      </section>
    </AuthenticatedTemplate>
  );
};

export default Page;
