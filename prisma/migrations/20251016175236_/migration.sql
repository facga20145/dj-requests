/*
  Warnings:

  - You are about to drop the column `artist` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `requester` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spotifyId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistName` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Request` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Request` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Request" DROP CONSTRAINT "Request_userId_fkey";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "artist",
DROP COLUMN "position",
DROP COLUMN "requester",
DROP COLUMN "status",
ADD COLUMN     "albumName" TEXT,
ADD COLUMN     "artistName" TEXT NOT NULL,
ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "djId" TEXT,
ADD COLUMN     "previewUrl" TEXT,
ADD COLUMN     "spotifyId" TEXT,
ADD COLUMN     "statusId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropEnum
DROP TYPE "public"."RequestStatus";

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RequestStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_key" ON "UserRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RequestStatus_name_key" ON "RequestStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Request_spotifyId_key" ON "Request"("spotifyId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RequestStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_djId_fkey" FOREIGN KEY ("djId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
