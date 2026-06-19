/**
 * infra/alloydb/client.ts
 * AlloyDB TypeScript client — @google-cloud/alloydb v2 (admin API) + pg (wire protocol)
 *
 * SDK source: https://github.com/googleapis/google-cloud-node/tree/main/packages/google-cloud-alloydb
 * API ref:    https://cloud.google.com/nodejs/docs/reference/alloydb/latest
 * Docs:       https://cloud.google.com/alloydb/docs
 *
 * Official images (verified from Google AlloyDB Omni registration):
 *   Debian:   gcr.io/alloydb-omni/alloydbomni:18
 *   UBI9:     gcr.io/alloydb-omni/alloydbomni:18-ubi9
 *   UI guide: https://services.google.com/fh/files/misc/alloydbomni_standalone_ui_userguide_container.pdf
 *   Contact:  alloydb-omni-contact@google.com
 *
 * Two modes:
 *   1. AlloyDB Omni (Docker/local) — pg wire protocol → pool.ts
 *   2. Google Cloud AlloyDB (managed) — AlloyDBAdminClient → this file
 *
 * Auth: Application Default Credentials (gcloud auth application-default login
 *       or Workload Identity). Not ANTHROPIC_API_KEY — that is egress proxy only.
 *
 * Available API surface (v1, v1alpha, v1beta via AlloyDBAdminClient):
 *   Cluster ops:  createCluster, getCluster, listClusters, updateCluster,
 *                 deleteCluster, promoteCluster, restoreCluster, exportCluster,
 *                 importCluster, switchoverCluster, upgradeCluster
 *   Instance ops: createInstance, getInstance, listInstances, updateInstance,
 *                 deleteInstance, batchCreateInstances, createSecondaryInstance,
 *                 failoverInstance, injectFault, restartInstance
 *   Database ops: listDatabases, executeSql
 *   Backup ops:   createBackup, getBackup, listBackups, updateBackup, deleteBackup
 *   User ops:     createUser, getUser, listUsers, updateUser, deleteUser
 *   Connectivity: getConnectionInfo, generateClientCertificate
 *   Flags:        listSupportedDatabaseFlags
 *   LRO helpers:  check*Progress, getOperation, cancelOperation
 */

import { AlloyDBAdminClient } from "@google-cloud/alloydb";

// ── Config ────────────────────────────────────────────────────────────────────

export interface AlloyDBAdminConfig {
  projectId: string;
  region: string;
  clusterId: string;
  instanceId?: string;
}

// ── Admin Client ──────────────────────────────────────────────────────────────

export class E2MAlloyDBAdmin {
  readonly admin: AlloyDBAdminClient;
  private readonly cfg: AlloyDBAdminConfig;

  constructor(config: AlloyDBAdminConfig) {
    this.cfg = config;
    this.admin = new AlloyDBAdminClient();
  }

  // ── Path helpers ──────────────────────────────────────────────────────────

  get clusterPath(): string {
    return this.admin.clusterPath(this.cfg.projectId, this.cfg.region, this.cfg.clusterId);
  }

  instancePath(instanceId = this.cfg.instanceId ?? ""): string {
    return this.admin.instancePath(this.cfg.projectId, this.cfg.region, this.cfg.clusterId, instanceId);
  }

  // ── Cluster ───────────────────────────────────────────────────────────────

  async getCluster() {
    const [cluster] = await this.admin.getCluster({ name: this.clusterPath });
    return cluster;
  }

  /** Async iterator — streams pages without buffering all results. */
  listClustersAsync(filter?: string) {
    return this.admin.listClustersAsync({
      parent: `projects/${this.cfg.projectId}/locations/${this.cfg.region}`,
      filter,
    });
  }

  async updateCluster(mask: string[], fields: Record<string, unknown>) {
    const [op] = await this.admin.updateCluster({
      cluster: { name: this.clusterPath, ...fields },
      updateMask: { paths: mask },
    });
    return op.promise();
  }

  async upgradeCluster(version: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [op] = await this.admin.upgradeCluster({ name: this.clusterPath, version } as any);
    return op.promise();
  }

  async exportCluster(gcsUri: string) {
    const [op] = await this.admin.exportCluster({
      name: this.clusterPath,
      gcsDestination: { uri: gcsUri },
    });
    return op.promise();
  }

  // ── Instance ──────────────────────────────────────────────────────────────

  async getInstance(instanceId = this.cfg.instanceId) {
    if (!instanceId) throw new Error("instanceId required");
    const [instance] = await this.admin.getInstance({ name: this.instancePath(instanceId) });
    return instance;
  }

  listInstancesAsync() {
    return this.admin.listInstancesAsync({ parent: this.clusterPath });
  }

  async restartInstance(instanceId = this.cfg.instanceId) {
    if (!instanceId) throw new Error("instanceId required");
    const [op] = await this.admin.restartInstance({ name: this.instancePath(instanceId) });
    return op.promise();
  }

  async failoverInstance(instanceId = this.cfg.instanceId) {
    if (!instanceId) throw new Error("instanceId required");
    const [op] = await this.admin.failoverInstance({ name: this.instancePath(instanceId) });
    return op.promise();
  }

  // ── Connectivity ──────────────────────────────────────────────────────────

  /** Returns ipAddress, publicIpAddress, pscDnsName etc. */
  async getConnectionInfo(instanceId = this.cfg.instanceId) {
    if (!instanceId) throw new Error("instanceId required");
    // API uses parent = instance path for getConnectionInfo
    const [info] = await this.admin.getConnectionInfo({
      parent: this.instancePath(instanceId),
    });
    return info;
  }

  async generateClientCertificate(instanceId = this.cfg.instanceId) {
    if (!instanceId) throw new Error("instanceId required");
    const [cert] = await this.admin.generateClientCertificate({
      parent: this.instancePath(instanceId),
    });
    return cert;
  }

  // ── Databases ─────────────────────────────────────────────────────────────

  /** List all PostgreSQL databases in the cluster. */
  listDatabasesAsync() {
    return this.admin.listDatabasesAsync({ parent: this.clusterPath });
  }

  /**
   * Execute SQL against the cluster via the AlloyDB Data API.
   * Requires: alloydb.googleapis.com Data API enabled, IAM role alloydb.admin.
   * For Omni/local: use pg pool directly (infra/alloydb/pool.ts).
   */
  async executeSql(
    instanceId: string,
    database: string,
    query: string,
    params?: string[],
  ) {
    const [result] = await this.admin.executeSql({
      instance: this.instancePath(instanceId),
      database,
      sqlStatement: query,
      user: "postgres",
      ...(params ? { queryParameters: params.map((v) => ({ value: v })) } : {}),
    });
    return result;
  }

  // ── Users ─────────────────────────────────────────────────────────────────

  listUsersAsync() {
    return this.admin.listUsersAsync({ parent: this.clusterPath });
  }

  async createUser(userId: string, password: string) {
    const [user] = await this.admin.createUser({
      parent: this.clusterPath,
      userId,
      user: { name: userId, password, userType: "ALLOYDB_BUILT_IN" as const },
    });
    return user;
  }

  // ── Backups ───────────────────────────────────────────────────────────────

  listBackupsAsync() {
    return this.admin.listBackupsAsync({
      parent: `projects/${this.cfg.projectId}/locations/${this.cfg.region}`,
    });
  }

  async createBackup(backupId: string, description?: string) {
    const [op] = await this.admin.createBackup({
      parent: `projects/${this.cfg.projectId}/locations/${this.cfg.region}`,
      backupId,
      backup: {
        clusterName: this.clusterPath,
        description,
        type: "ON_DEMAND" as const,
      },
    });
    return op.promise();
  }

  // ── Flags ─────────────────────────────────────────────────────────────────

  listSupportedDatabaseFlagsAsync() {
    return this.admin.listSupportedDatabaseFlagsAsync({
      parent: `projects/${this.cfg.projectId}/locations/${this.cfg.region}`,
    });
  }

  async close() {
    await this.admin.close();
  }
}

// ── AlloyDB Omni Docker connection config (pg wire protocol) ──────────────────

export interface AlloyDBOmniConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

export const ALLOYDB_OMNI_CONFIGS = {
  localDocker: (): AlloyDBOmniConfig => ({
    host: process.env.ALLOYDB_HOST ?? "127.0.0.1",
    port: Number(process.env.ALLOYDB_PORT ?? 5432),
    database: process.env.ALLOYDB_DB ?? "e2m",
    user: process.env.ALLOYDB_USER ?? "postgres",
    password: process.env.ALLOYDB_PASSWORD ?? "postgres",
    ssl: false,
  }),

  dockerCompose: (): AlloyDBOmniConfig => ({
    host: "alloydb-omni",
    port: 5432,
    database: "e2m",
    user: "postgres",
    password: process.env.ALLOYDB_PASSWORD ?? "postgres",
    ssl: false,
  }),

  cloudManaged: (instanceIp: string): AlloyDBOmniConfig => ({
    host: instanceIp,
    port: 5432,
    database: "e2m",
    user: "postgres",
    password: process.env.ALLOYDB_PASSWORD ?? "",
    ssl: true,
  }),
} as const;
