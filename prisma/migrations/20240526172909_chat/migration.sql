/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `chats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chats_title_key" ON "chats"("title");
