/*
  Warnings:

  - You are about to drop the column `platform_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[platform_type]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform_type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_platform_id_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `platform_id`,
    ADD COLUMN `platform_type` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_platform_type_key` ON `User`(`platform_type`);
