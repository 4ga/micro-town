# PostgreSQL Environment

## Machine

- Operating system: macOS
- Processor architecture: arm64
- Shell: zsh
- Package manager: Homebrew 6.0.11

## PostgreSQL Installation

- Installation method: Homebrew
- PostgreSQL client version: 18.4
- PostgreSQL server version: 18.4
- Homebrew formula: postgresql@18
- PostgreSQL executable: /opt/homebrew/opt/postgresql@18/bin/postgres
- psql executable: /opt/homebrew/opt/postgresql@18/bin/psql

## Server and Client

PostgreSQL is the database server. It manages databases, durable storage, SQL
execution, transactions, constraints, permissions, and concurrent connections.

psql is a command-line client. It connects to a PostgreSQL server, accepts SQL
and psql meta-commands, sends SQL to the server, and displays the server's
results.

The psql client and PostgreSQL server are separate programs. The client can be
installed without the server running, and a client may connect to a server on
the same computer or on another computer.

## Connection Evidence

The `\conninfo` command reported:

- Database: postgres
- Client user: ga
- Socket directory: /tmp
- Server port: 5432
- Protocol version: 3.0
- Password used: false
- SSL connection: false
- Superuser: on
- Hot standby: off

`SELECT version();` reported:

PostgreSQL 18.4 (Homebrew) running on 64-bit Apple Silicon macOS.

`SELECT current_database(), current_user;` reported:

- Current database: postgres
- Current user: ga

The successful SQL queries demonstrate that psql established a connection to a
running PostgreSQL server.

## Default Databases

The initial installation contains:

- `postgres`: a general-purpose administrative database
- `template0`: a protected, clean database template
- `template1`: the default template copied when a new database is created

## Commands Learned

- `brew services start postgresql@18` starts PostgreSQL as a Homebrew-managed background service.
- `brew services list` displays the status of Homebrew-managed services.
- `psql postgres` launches psql and attempts to connect to the `postgres` database.
- `\conninfo` displays information about the current psql connection.
- `SELECT version();` asks the PostgreSQL server for its version information.
- `SELECT current_database(), current_user;` displays the current database and role.
- `\l` lists databases using a psql meta-command.
- `\q` exits the psql client.

## SQL and psql Meta-Commands

SQL statements are sent to the PostgreSQL server and normally end with a
semicolon.

Example:

```sql
SELECT current_database();
```

psql meta-commands begin with a backslash and are handled by the psql client.
They do not require semicolons.

Examples:

```text
\conninfo
\l
\q
```

When the prompt changes from `postgres=#` to `postgres-#`, psql is waiting for
the current SQL statement to be completed. A missing semicolon is one common
cause.

## Problems Encountered

No installation failures occurred.

During the first session, the prompt changed to `postgres-#`, indicating that
psql was waiting for an incomplete SQL statement. SQL statements should be
terminated with a semicolon.

## Questions I Still Have

- How do PostgreSQL databases, schemas, and tables relate to one another?
- How should separate Micro Town business domains exchange data while preserving consistency?
- Why did my local connection not require a password?
- When should an application use a non-superuser PostgreSQL role?
