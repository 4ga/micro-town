# First PostgreSQL Table

## Table Definition

```sql
CREATE TABLE schema_name.table_name (
    column_name data_type constraints
);
```

Example:

```sql
CREATE TABLE core.learning_business (
    business_id integer,
    business_name text,
    employee_count integer
);
```

## Data Types Used

- integer
- text

## Rows Inserted

Example: insert one row

```sql
INSERT INTO core.learning_business (
    business_id,
    business_name,
    employee_count
)
VALUES (
    1,
    'Micro Town Cafe',
    8
);
```

Output:

```text
INSERT 0 1
```

Example: insert multiple rows

```sql
INSERT INTO core.learning_business (
    business_id,
    business_name,
    employee_count
)
VALUES
    (2, 'Community Bank', 24),
    (3, 'Grand Hotel', 35),
    (4, 'Town Library', 12);
```

Output:

```text
INSERT 0 3
```

## Query Results

Example: Read the row

```sql
SELECT *
FROM core.learning_business;
```

```text
micro_town_dev=# SELECT * FROM core.learning_business;
 business_id |  business_name  | employee_count
-------------+-----------------+----------------
           1 | Micro Town Cafe |              8
(1 row)
```

Example: Filter rows:

```sql
SELECT business_name, employee_count
FROM core.learning_business
WHERE employee_count >= 20;
```

Output:

```text
 business_name  | employee_count
----------------+----------------
 Community Bank |             24
 Grand Hotel    |             35
(2 rows)
```

## Invalid Data PostgreSQL Accepted

Example: Deliberately insert bad data

```sql
INSERT INTO core.learning_business (
    business_id,
    business_name,
    employee_count
)
VALUES (
    5,
    NULL,
    -30
);
```

Output:

```text
INSERT 0 1
```

Then query:

```sql
SELECT *
FROM core.learning_business;
```

Output:

```text
micro_town_dev=# SELECT * FROM core.learning_business;
 business_id |  business_name  | employee_count
-------------+-----------------+----------------
           1 | Micro Town Cafe |              8
           2 | Community Bank  |             24
           3 | Grand Hotel     |             35
           4 | Town Library    |             12
           5 |                 |            -30
(5 rows)
```

A data type alone does not establish every business rule. Constraints must defined.

## Invalid Data PostgreSQL Rejected

Example: Attempt a wrong data type

```sql
INSERT INTO core.learning_business (
    business_id,
    business_name,
    employee_count
)
VALUES (
    6,
    'Town Grocery',
    'many'
);
```

Output:

```text
ERROR:  invalid input syntax for type integer: "many"
LINE 1: ...ess_name, employee_count) VALUES(6, 'Town Grocery', 'many');
```

## Existing Empty Table vs Missing Table

```text
Existing table with no rows → successful query returning 0 rows
Missing table → relation does not exist error
```

## CREATE vs INSERT vs DELETE vs DROP

```text
CREATE -> creates a table
INSERT -> inserts data into a table
DELETE -> remove data from a table
DROP -> deletes table
```

## Lessons Learned

- A table definition and its rows are separate things.
- An existing table can contain zero rows.
- PostgreSQL enforces declared data types.
- PostgreSQL does not infer business rules from column names.
- `NULL` and negative integers are accepted unless constraints reject them.
- Explicit column lists make `INSERT` statements safer and clearer.
- `DELETE` removes rows while `DROP TABLE` removes the table definition and its rows.

## Questions I Still Have

- How would I delete a row(s) from a table?
- How would I add data constraints?
