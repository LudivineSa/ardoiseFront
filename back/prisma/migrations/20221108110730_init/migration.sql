/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Business_has_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project_has_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_has_tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business_has_users" DROP CONSTRAINT "Business_has_users_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business_has_users" DROP CONSTRAINT "Business_has_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Project_has_users" DROP CONSTRAINT "Project_has_users_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project_has_users" DROP CONSTRAINT "Project_has_users_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "User_has_tasks" DROP CONSTRAINT "User_has_tasks_taskId_fkey";

-- DropForeignKey
ALTER TABLE "User_has_tasks" DROP CONSTRAINT "User_has_tasks_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "token";

-- DropTable
DROP TABLE "Business";

-- DropTable
DROP TABLE "Business_has_users";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Project_has_users";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User_has_tasks";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Paypal" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Paypal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank_account" (
    "id" SERIAL NOT NULL,
    "RIB" TEXT NOT NULL,
    "Adress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paypal_email_key" ON "Paypal"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_account_RIB_key" ON "Bank_account"("RIB");

-- AddForeignKey
ALTER TABLE "Paypal" ADD CONSTRAINT "Paypal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bank_account" ADD CONSTRAINT "Bank_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
