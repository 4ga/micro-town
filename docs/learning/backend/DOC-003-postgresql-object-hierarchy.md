# PostgreSQL Object Hierarchy

```text

PostgreSQL server
└── Database
    └── Schema
        └── Table
            ├── Column definitions
            └── Rows
```

## Server

The PostgreSQL server currently manages three databases:

```text
postgres
template
template1
```

## Database

A connection operates inside one database at a time.

## Schema

Inside a database are schemas. It is a namespace that organizes objects such as tables.

## Table

A table defines the shape and rules of a particular relation.

```text
core.organization

party_id | legal_name       | created_at
---------+------------------+------------------------
1        | Micro Town Cafe  | 2026-07-17 10:00:00
2        | Community Bank   | 2026-07-17 10:05:00
```

## Row

A row represents one recorded fact or entity instance.

## Column

A column defines an attribute and its permitted kind of value.

## Fully Qualified Names

A fully qualified table name combines the schema name and table name, such as core.party.

## Search Path

The search path determines which schemas PostgreSQL searches when you use an unqualified name

## Micro Town Organization

```text
micro_town database
├── core schema
│   ├── party table
│   ├── person table
│   └── organization table
├── restaurant schema
│   ├── menu_item table
│   └── customer_order table
└── hotel schema
    ├── room table
    └── reservation table
```

## Questions I Still Have

- How should separate Micro Town business domains exchange data while preserving consistency?
- How do I create shared schemas and tables?
