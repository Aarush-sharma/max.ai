/*
  Warnings:

  - You are about to drop the column `saved_chats` on the `chats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_user_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_id_fkey";

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "saved_chats",
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "messages" ALTER COLUMN "chat_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "chats_title_key" ON "chats"("title");

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
