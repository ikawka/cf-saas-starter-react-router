#!/usr/bin/env bun
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { intro, outro, confirm, spinner, cancel } from "@clack/prompts";

function executeCommand(
  command: string,
  silent = false,
  env?: Record<string, string>
) {
  if (!silent) {
    console.log(`\x1b[33m${command}\x1b[0m`);
  }
  try {
    return execSync(command, {
      encoding: "utf-8",
      stdio: silent ? "pipe" : "inherit",
      env: env ? { ...process.env, ...env } : undefined,
    });
  } catch (error: any) {
    return { error: true, message: error.stdout || error.stderr || "" };
  }
}

function extractAccountDetails(output: string): { name: string; id: string }[] {
  const lines = output.split("\n");
  const accountDetails: { name: string; id: string }[] = [];

  for (const line of lines) {
    const isValidLine =
      line.trim().startsWith("│ ") && line.trim().endsWith(" │");

    if (isValidLine) {
      const regex = /\b[a-f0-9]{32}\b/g;
      const matches = line.match(regex);

      if (matches && matches.length === 1) {
        const accountName = line.split("│ ")[1]?.trim();
        const accountId = matches[0].replace("│ ", "").replace(" │", "");
        if (accountName && accountId) {
          accountDetails.push({ name: accountName, id: accountId });
        }
      }
    }
  }

  return accountDetails;
}

function restoreHandlebarsInPackageJson(projectName: string, dbName: string) {
  const packageJsonPath = path.join(__dirname, "..", "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.error("\x1b[31m✗ package.json not found\x1b[0m");
    return;
  }

  let content = fs.readFileSync(packageJsonPath, "utf-8");

  // Restore "name" field: "name": "my-project" → "name": "{{projectName}}"
  content = content.replace(
    `"name": "${projectName}"`,
    `"name": "{{projectName}}"`
  );

  // Restore db migration scripts: "my-project-db" → "{{dbName}}"
  content = content.replaceAll(dbName, "{{dbName}}");

  fs.writeFileSync(packageJsonPath, content);
  console.log("\x1b[32m✓ Restored handlebars in package.json\x1b[0m");
}

interface WranglerConfig {
  name: string;
  d1_databases?: { binding: string; database_name: string; database_id: string }[];
  r2_buckets?: { binding: string; bucket_name: string }[];
  kv_namespaces?: { binding: string; id: string }[];
  workflows?: { binding: string; name: string; class_name: string }[];
}

function readWranglerConfig(): WranglerConfig | null {
  const wranglerPath = path.join(__dirname, "..", "wrangler.jsonc");

  if (!fs.existsSync(wranglerPath)) {
    return null;
  }

  const content = fs.readFileSync(wranglerPath, "utf-8");
  // Strip single-line comments for JSONC parsing
  const jsonContent = content.replace(/^\s*\/\/.*$/gm, "");

  try {
    return JSON.parse(jsonContent);
  } catch {
    console.error("\x1b[31m✗ Failed to parse wrangler.jsonc\x1b[0m");
    return null;
  }
}

async function main() {
  intro("🗑️  Cloudflare SaaS Stack - Teardown");

  // Read wrangler.jsonc to get resource names
  const config = readWranglerConfig();

  if (!config) {
    console.error(
      "\x1b[31m✗ wrangler.jsonc not found. Nothing to tear down.\x1b[0m"
    );
    cancel("Operation cancelled.");
    process.exit(1);
  }

  const projectName = config.name;
  const databases = config.d1_databases ?? [];
  const buckets = config.r2_buckets ?? [];
  const kvNamespaces = config.kv_namespaces ?? [];

  console.log("\n\x1b[31mThe following resources will be DELETED:\x1b[0m\n");
  console.log(`  • Worker:   ${projectName}`);
  for (const db of databases) {
    console.log(`  • D1 DB:    ${db.database_name} (${db.database_id})`);
  }
  for (const bucket of buckets) {
    console.log(`  • R2:       ${bucket.bucket_name}`);
  }
  for (const kv of kvNamespaces) {
    console.log(`  • KV:       ${kv.id}`);
  }

  const shouldContinue = await confirm({
    message: "Are you sure you want to delete ALL of these resources? This cannot be undone.",
    initialValue: false,
  });

  if (!shouldContinue) {
    cancel("Teardown cancelled.");
    process.exit(0);
  }

  // Check wrangler auth
  console.log("\n\x1b[36mChecking Wrangler authentication...\x1b[0m");
  const whoamiOutput = executeCommand("wrangler whoami", true);

  if (
    !whoamiOutput ||
    typeof whoamiOutput !== "string" ||
    whoamiOutput.includes("not authenticated")
  ) {
    console.error(
      "\x1b[31m✗ Not logged in. Please run `wrangler login` first.\x1b[0m"
    );
    cancel("Operation cancelled.");
    process.exit(1);
  }
  console.log("\x1b[32m✓ Authenticated with Cloudflare\x1b[0m");

  // Detect account
  const accounts = extractAccountDetails(whoamiOutput);
  let accountId: string | undefined;

  if (accounts.length > 1) {
    // Import select dynamically since we only need it for multi-account
    const { select } = await import("@clack/prompts");
    console.log(
      `\n\x1b[33m⚠ Multiple Cloudflare accounts detected (${accounts.length} accounts)\x1b[0m`
    );
    const options = accounts.map((account) => ({
      value: account.id,
      label: account.name,
    }));
    accountId = (await select({
      message: "Select the account to tear down from:",
      options,
    })) as string;
  } else if (accounts.length === 1 && accounts[0]?.id) {
    accountId = accounts[0].id;
  }

  const env = accountId ? { CLOUDFLARE_ACCOUNT_ID: accountId } : undefined;

  // Step 1: Delete the Worker
  console.log("\n\x1b[36m🗑️  Step 1: Deleting Worker\x1b[0m");
  const workerSpinner = spinner();
  workerSpinner.start(`Deleting worker: ${projectName}...`);
  const workerResult = executeCommand(
    `wrangler delete --name ${projectName} --force`,
    true,
    env
  );
  if (workerResult && typeof workerResult === "object" && workerResult.error) {
    workerSpinner.stop(`\x1b[33m⚠ Worker deletion failed (may not exist)\x1b[0m`);
  } else {
    workerSpinner.stop(`\x1b[32m✓ Worker deleted\x1b[0m`);
  }

  // Step 2: Delete D1 databases
  console.log("\n\x1b[36m🗑️  Step 2: Deleting D1 Databases\x1b[0m");
  for (const db of databases) {
    const dbSpinner = spinner();
    dbSpinner.start(`Deleting database: ${db.database_name}...`);
    const dbResult = executeCommand(
      `wrangler d1 delete ${db.database_name} -y`,
      true,
      env
    );
    if (dbResult && typeof dbResult === "object" && dbResult.error) {
      // Try by ID if name fails
      const dbResult2 = executeCommand(
        `wrangler d1 delete ${db.database_id} -y`,
        true,
        env
      );
      if (dbResult2 && typeof dbResult2 === "object" && dbResult2.error) {
        dbSpinner.stop(
          `\x1b[33m⚠ Failed to delete database: ${db.database_name}\x1b[0m`
        );
      } else {
        dbSpinner.stop(`\x1b[32m✓ Database deleted: ${db.database_name}\x1b[0m`);
      }
    } else {
      dbSpinner.stop(`\x1b[32m✓ Database deleted: ${db.database_name}\x1b[0m`);
    }
  }

  // Step 3: Delete R2 buckets
  console.log("\n\x1b[36m🗑️  Step 3: Deleting R2 Buckets\x1b[0m");
  for (const bucket of buckets) {
    const bucketSpinner = spinner();
    bucketSpinner.start(`Deleting bucket: ${bucket.bucket_name}...`);
    const bucketResult = executeCommand(
      `wrangler r2 bucket delete ${bucket.bucket_name}`,
      true,
      env
    );
    if (bucketResult && typeof bucketResult === "object" && bucketResult.error) {
      bucketSpinner.stop(
        `\x1b[33m⚠ Failed to delete bucket: ${bucket.bucket_name}\x1b[0m`
      );
    } else {
      bucketSpinner.stop(`\x1b[32m✓ Bucket deleted: ${bucket.bucket_name}\x1b[0m`);
    }
  }

  // Step 4: Delete KV namespaces
  if (kvNamespaces.length > 0) {
    console.log("\n\x1b[36m🗑️  Step 4: Deleting KV Namespaces\x1b[0m");
    for (const kv of kvNamespaces) {
      const kvSpinner = spinner();
      kvSpinner.start(`Deleting KV namespace: ${kv.id}...`);
      const kvResult = executeCommand(
        `wrangler kv namespace delete --namespace-id ${kv.id}`,
        true,
        env
      );
      if (kvResult && typeof kvResult === "object" && kvResult.error) {
        kvSpinner.stop(`\x1b[33m⚠ Failed to delete KV namespace: ${kv.id}\x1b[0m`);
      } else {
        kvSpinner.stop(`\x1b[32m✓ KV namespace deleted\x1b[0m`);
      }
    }
  }

  // Step 5: Restore package.json handlebars
  console.log("\n\x1b[36m🔄 Step 5: Restoring package.json\x1b[0m");
  const dbName = databases[0]?.database_name;
  if (dbName) {
    restoreHandlebarsInPackageJson(projectName, dbName);
  } else {
    console.log("\x1b[33m⚠ No database found in config, skipping package.json restore\x1b[0m");
  }

  // Step 6: Clean up local files
  console.log("\n\x1b[36m🧹 Step 6: Cleaning Up Local Files\x1b[0m");

  const cleanupLocal = await confirm({
    message: "Delete local configuration files? (wrangler.jsonc, .env)",
    initialValue: false,
  });

  if (cleanupLocal) {
    const wranglerPath = path.join(__dirname, "..", "wrangler.jsonc");
    const envPath = path.join(__dirname, "..", ".env");

    if (fs.existsSync(wranglerPath)) {
      fs.unlinkSync(wranglerPath);
      console.log("\x1b[32m✓ Deleted wrangler.jsonc\x1b[0m");
    }

    if (fs.existsSync(envPath)) {
      fs.unlinkSync(envPath);
      console.log("\x1b[32m✓ Deleted .env\x1b[0m");
    }

    // Re-add wrangler.jsonc to .gitignore
    const gitignorePath = path.join(__dirname, "..", ".gitignore");
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, "utf-8");
      if (!content.includes("wrangler.jsonc")) {
        fs.writeFileSync(gitignorePath, content.trimEnd() + "\nwrangler.jsonc\n");
        console.log("\x1b[32m✓ Re-added wrangler.jsonc to .gitignore\x1b[0m");
      }
    }
  }

  console.log("\n\x1b[36m✅ Teardown Complete!\x1b[0m\n");
  console.log("\x1b[32mAll Cloudflare resources have been deleted.\x1b[0m");
  console.log(
    "\x1b[33mTo set up again, run: bun run setup\x1b[0m\n"
  );

  outro("🏁 Done!");
}

main().catch((error) => {
  console.error("\x1b[31mUnexpected error:\x1b[0m", error);
  process.exit(1);
});
