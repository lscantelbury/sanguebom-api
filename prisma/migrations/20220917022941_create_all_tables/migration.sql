-- CreateTable
CREATE TABLE "Hospital" (
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

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("hosp_id_pk")
);

-- CreateTable
CREATE TABLE "Certification" (
    "cert_id_pk" SERIAL NOT NULL,
    "cert_date" TIMESTAMP(3) NOT NULL,
    "hosp_id_fk" INTEGER NOT NULL,
    "cert_tipo_sanguineo" TEXT NOT NULL,
    "user_id_fk" INTEGER NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("cert_id_pk")
);

-- CreateTable
CREATE TABLE "Comment" (
    "com_id_pk" SERIAL NOT NULL,
    "comment_text" TEXT NOT NULL,
    "user_id_fk" INTEGER NOT NULL,
    "post_id_fk" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("com_id_pk")
);

-- CreateTable
CREATE TABLE "Post" (
    "post_id_pk" SERIAL NOT NULL,
    "post_text" TEXT NOT NULL,
    "post_type" INTEGER NOT NULL,
    "post_points_to_share" INTEGER NOT NULL,
    "post_owner_id" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id_pk")
);

-- CreateTable
CREATE TABLE "Like" (
    "like_id_pk" SERIAL NOT NULL,
    "post_id_fk" INTEGER NOT NULL,
    "user_id_fk" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("like_id_pk")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_hosp_username_key" ON "Hospital"("hosp_username");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_fk_key" ON "Like"("user_id_fk");

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_hosp_id_fk_fkey" FOREIGN KEY ("hosp_id_fk") REFERENCES "Hospital"("hosp_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fk_fkey" FOREIGN KEY ("post_id_fk") REFERENCES "Post"("post_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("user_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_post_id_fk_fkey" FOREIGN KEY ("post_id_fk") REFERENCES "Post"("post_id_pk") ON DELETE RESTRICT ON UPDATE CASCADE;
