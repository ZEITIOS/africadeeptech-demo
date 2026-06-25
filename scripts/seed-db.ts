/**
 * Seed script — pushes all demo data into InsForge Postgres via SDK.
 * Run: npx tsx scripts/seed-db.ts
 */
import { createClient } from "@insforge/sdk";
import { SEED_DATA } from "../lib/seed-data";

const insforge = createClient({
  baseUrl: "https://5fs5wjh9.us-east.insforge.app",
  anonKey: "ik_d5831ce03459ffc6b7246bf8620898db",
});

async function clearTable(table: string) {
  // Delete all rows by selecting all with a truthy condition
  const { error } = await insforge.database
    .from(table)
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    console.warn(`  ⚠ Clear ${table}: ${error.message}`);
  } else {
    console.log(`  ✓ Cleared ${table}`);
  }
}

async function insertRows(table: string, rows: readonly Record<string, unknown>[]) {
  const { data, error } = await insforge.database
    .from(table)
    .insert([...rows])
    .select();

  if (error) {
    throw new Error(`Failed to insert into ${table}: ${error.message}`);
  }

  console.log(`  ✓ ${table}: ${Array.isArray(data) ? data.length : 1} rows`);
  return data;
}

async function main() {
  console.log("🗑  Clearing existing data...\n");

  const tables = [
    "adt_milestone_evidence",
    "adt_milestones",
    "adt_grants",
    "adt_interview_answers",
    "adt_interview_sessions",
    "adt_evaluations",
    "adt_submissions",
    "adt_challenges",
  ];

  for (const t of tables) {
    await clearTable(t);
  }

  console.log("\n🌱 Seeding data...\n");

  await insertRows("adt_challenges", SEED_DATA.challenges as unknown as Record<string, unknown>[]);
  await insertRows("adt_submissions", SEED_DATA.submissions as unknown as Record<string, unknown>[]);
  await insertRows("adt_evaluations", SEED_DATA.evaluations as unknown as Record<string, unknown>[]);
  await insertRows("adt_interview_sessions", SEED_DATA.interview_sessions as unknown as Record<string, unknown>[]);
  await insertRows("adt_interview_answers", SEED_DATA.interview_answers as unknown as Record<string, unknown>[]);
  await insertRows("adt_grants", SEED_DATA.grants as unknown as Record<string, unknown>[]);
  await insertRows("adt_milestones", SEED_DATA.milestones as unknown as Record<string, unknown>[]);
  await insertRows("adt_milestone_evidence", SEED_DATA.milestone_evidence as unknown as Record<string, unknown>[]);

  console.log("\n✅ Seed complete!\n");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
