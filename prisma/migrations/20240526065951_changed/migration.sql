/*
  Warnings:

  - Changed the type of `user_id` on the `chats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `chat_id` on the `messages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_user_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_id_fkey";

-- DropIndex
DROP INDEX "chats_title_key";

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "chat_id",
ADD COLUMN     "chat_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
