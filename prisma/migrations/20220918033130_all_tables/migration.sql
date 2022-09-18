/*
  Warnings:

  - You are about to drop the `Certification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_hosp_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_user_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_post_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fk_fkey";

-- DropTable
DROP TABLE "Certification";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Hospital";

-- DropTable
DROP TABLE "Like";

-- CreateTable
CREATE TABLE "hospitals" (
    "hosp_id_pk" SERIAL NOT NULL,
    "hosp_name" TEXT NOT NULL,
    "hosp_username" TEXT NOT NULL,
    "hosp_password" TEXT NOT NULL,
    "hosp_rua" TEXT NOT NULL,
    "hosp_cep" INTEGER NOT NULL,
    "hosp_cidade" TEXT NOT NULL,
    "hosp_num_predial" INTEGER NOT NULL,
    "hosp_unidade_federal" TEXT NOT NULL,
    "hosp_pic" TEXT NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("hosp_id_pk")
);

-- CreateTable
CREATE TABLE "certifications" (
    "cert_id_pk" SERIAL NOT NULL,
    "cert_date" TIMESTAMP(3) NOT NULL,
    "hosp_id_fk" INTEGER NOT NULL,
    "cert_tipo_sanguineo" TEXT NOT NULL,
    "user_id_fk" INTEGER NOT NULL,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("cert_id_pk")
);

-- CreateTable
CREATE TABLE "comments" (
    "com_id_pk" SERIAL NOT NULL,
    "comment_text" TEXT NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    "post_id_fk" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("com_id_pk")
);

-- CreateTable
CREATE TABLE "likes" (
    "like_id_pk" SERIAL NOT NULL,
    "post_id_fk" INTEGER NOT NULL,
    "user_id_fk" INTEGER NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("like_id_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_hosp_username_key" ON "hospitals"("hosp_username");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_fk_key" ON "likes"("user_id_fk");

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_hosp_id_fk_fkey" FOREIGN KEY ("hosp_id_fk") REFERENCES "hospitals"("hosp_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fk_fkey" FOREIGN KEY ("post_id_fk") REFERENCES "posts"("post_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fk_fkey" FOREIGN KEY ("post_id_fk") REFERENCES "posts"("post_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
