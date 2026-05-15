

# Release notes for Amazon Aurora MySQL-Compatible Edition
<a name="Welcome"></a><a name="mysql_relnotes"></a>

Amazon Aurora MySQL-Compatible Edition releases updates regularly. Updates are applied to Aurora MySQL DB clusters during system maintenance windows. The timing when updates are applied depends on the AWS Region and maintenance window setting for the DB cluster, and also the type of update.

Amazon Aurora MySQL releases are made available to all AWS Regions over the course of multiple days. Some Regions might temporarily show an engine version that isn't available in a different Region yet. Release notes are published after the new versions are available in all Regions.

Updates are applied to all instances in a DB cluster at the same time. An update requires a database restart on all instances in a DB cluster. So you experience 20 to 30 seconds of downtime, after which you can resume using your DB cluster or clusters. You can view or change your maintenance window settings from the [AWS Management Console](https://console.aws.amazon.com/).

**Topics**
+ [Release calendars for Amazon Aurora MySQL](AuroraMySQL.release-calendars.md)
+ [Database engine updates for Amazon Aurora MySQL version 3](AuroraMySQL.Updates.30Updates.md)
+ [Database engine updates for Amazon Aurora MySQL version 2](AuroraMySQL.Updates.20Updates.md)
+ [Database engine updates for Amazon Aurora MySQL version 1 (Deprecated)](AuroraMySQL.Updates.11Updates.md)
+ [MySQL bugs fixed by Aurora MySQL database engine updates](AuroraMySQL.Updates.MySQLBugs.md)
+ [Security vulnerabilities fixed in Aurora MySQL](AuroraMySQL.CVE_list.md)