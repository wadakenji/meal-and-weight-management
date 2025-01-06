alter table "public"."meals" alter column "amount_of_energy" set data type real using "amount_of_energy"::real;

alter table "public"."meals" alter column "amount_of_protein" set data type real using "amount_of_protein"::real;


