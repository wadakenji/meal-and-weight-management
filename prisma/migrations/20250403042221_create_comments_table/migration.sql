-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "receiver_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "comment" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_receiver_id_sender_id_date_unique_constraint" ON "comments"("receiver_id", "sender_id", "date");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
