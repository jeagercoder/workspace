/*
  Warnings:

  - Added the required column `color` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `color` VARCHAR(191) NOT NULL;
