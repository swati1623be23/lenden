ALTER TABLE "Customer" ADD COLUMN "userId" TEXT;

DO $$
DECLARE
  account_count INTEGER;
  sole_account_id TEXT;
BEGIN
  SELECT COUNT(*), MIN("id")
  INTO account_count, sole_account_id
  FROM "User";

  IF account_count = 1 THEN
    UPDATE "Customer" SET "userId" = sole_account_id WHERE "userId" IS NULL;
  END IF;
END $$;

CREATE INDEX "Customer_userId_idx" ON "Customer"("userId");

ALTER TABLE "Customer"
ADD CONSTRAINT "Customer_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;