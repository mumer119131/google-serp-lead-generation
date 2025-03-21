/*
  Warnings:

  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Email";

-- CreateTable
CREATE TABLE "EmailLeads" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "link" TEXT,
    "snippet" TEXT,
    "site_name" TEXT,
    "site_desc" TEXT,
    "query" TEXT DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'scraped',
    "processed_email" TEXT DEFAULT '',
    "crawled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailLeads_pkey" PRIMARY KEY ("id")
);
