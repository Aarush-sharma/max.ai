-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "saved_chats" TEXT NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chat_id" INTEGER NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
