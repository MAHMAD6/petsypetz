import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { join } from "path";
import { pathToFileURL } from "url";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const createPrismaClient = () => {
  const root = process.cwd();

  // Resolve the database URL to an absolute file path for libsql.
  // libsql requires file:/// (three slashes) for absolute paths on Windows.
  let dbUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";

  let absDbPath: string;

  if (dbUrl.startsWith("file:")) {
    // Strip the "file:" prefix (may have 1, 2, or 3 slashes)
    const stripped = dbUrl.replace(/^file:[/\\]*/, "");

    // If the remaining path looks relative (no leading slash or drive letter), resolve it
    const isAbsolute = /^([A-Za-z]:[/\\]|\/)/.test(stripped);
    absDbPath = isAbsolute ? stripped : join(root, stripped);
  } else {
    absDbPath = join(root, dbUrl);
  }

  // pathToFileURL handles Windows drive letters and backslashes correctly → file:///C:/...
  dbUrl = pathToFileURL(absDbPath).href;

  console.log(`[DB] Resolved database URL: ${dbUrl}`);

  // Keep DATABASE_URL in sync so Prisma CLI picks it up too
  process.env.DATABASE_URL = dbUrl;

  const libsql = createClient({ url: dbUrl });
  const adapter = new PrismaLibSql(libsql);

  return new PrismaClient({ adapter });
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
