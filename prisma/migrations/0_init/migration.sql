-- CreateTable
CREATE TABLE "meals" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "datetime" TIMESTAMPTZ(6) NOT NULL,
    "name" VARCHAR NOT NULL,
    "amount_of_energy" REAL NOT NULL,
    "amount_of_protein" REAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "push_subscriptions" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "endpoint" VARCHAR NOT NULL,
    "key_p256dh" VARCHAR NOT NULL,
    "key_auth" VARCHAR NOT NULL,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_records" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "step" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "step_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_group_belongings" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "user_group_id" BIGINT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_group_belongings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_groups" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "user_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL DEFAULT '',
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "basal_metabolism_rate" REAL NOT NULL DEFAULT 0,
    "energy_per_step" REAL NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weight_records" (
    "id" BIGSERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "weight" REAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weght_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "push_subscriptions_user_id_key" ON "push_subscriptions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "step_records_id_key" ON "step_records"("id");

-- CreateIndex
CREATE UNIQUE INDEX "step_records_user_id_date_unique_constraint" ON "step_records"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "weght_records_id_key" ON "weight_records"("id");

-- CreateIndex
CREATE UNIQUE INDEX "weight_records_user_id_date_unique_constraint" ON "weight_records"("user_id", "date");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "push_subscriptions" ADD CONSTRAINT "push_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_records" ADD CONSTRAINT "step_records_user_id_fkey2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_belongings" ADD CONSTRAINT "user_group_belongings_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_belongings" ADD CONSTRAINT "user_group_belongings_user_id_fkey1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weight_records" ADD CONSTRAINT "weight_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

