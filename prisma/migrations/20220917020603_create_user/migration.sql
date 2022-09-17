/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_user_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fk_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "user_id_pk" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_rua" TEXT NOT NULL,
    "user_cep" INTEGER NOT NULL,
    "user_cidade" TEXT NOT NULL,
    "user_num_predial" INTEGER NOT NULL,
    "user_unidade_federal" TEXT NOT NULL,
    "user_tipo_sanguineo" TEXT NOT NULL,
    "user_profile_pic" TEXT NOT NULL,
    "user_nascimento" TIMESTAMP(3) NOT NULL,
    "user_points" INTEGER NOT NULL,
    "user_bairro" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
