# Migration `20200623224550-create-locations`

This migration has been generated by Zeheng Li at 6/23/2020, 10:45:50 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Location" (
"address" TEXT NOT NULL  ,"description" TEXT   ,"id" TEXT NOT NULL  ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "quaint"."Location.address" ON "Location"("address")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200623224550-create-locations
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,15 @@
+datasource DS {
+  provider = "sqlite"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = env("BINARY_TARGET")
+}
+
+model Location {
+  id          String  @id
+  address     String  @unique
+  description String?
+}
```


