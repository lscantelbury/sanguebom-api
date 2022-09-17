/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fk_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_post_id_fk_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "post_id_pk" SERIAL NOT NULL,
    "post_text" TEXT NOT NULL,
    "post_type" INTEGER NOT NULL,
    "post_points_to_share" INTEGER NOT NULL,
    "post_owner_id" INTEGER NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id_pk")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fk_fkey" FOREIGN KEY ("post_id_fk") REFERENCES "posts"("post_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_post_id_fk_fkey" FOREIGN KEY ("post_id_fk") REFERENCES "posts"("post_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
