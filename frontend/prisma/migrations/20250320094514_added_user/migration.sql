-- CreateTable
CREATE TABLE "Leads" (
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
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "GOOGLE_API_KEY" TEXT DEFAULT '',
    "CSE_ID" TEXT DEFAULT '',
    "DATABASE_URL" TEXT DEFAULT '',
    "DIRECT_URL" TEXT DEFAULT '',
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Leads" ADD CONSTRAINT "Leads_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
