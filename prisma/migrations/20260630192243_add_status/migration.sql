-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "projectType" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "features" TEXT,
    "score" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'New',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Lead" ("budget", "createdAt", "email", "features", "id", "name", "projectType", "score", "timeline") SELECT "budget", "createdAt", "email", "features", "id", "name", "projectType", "score", "timeline" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
