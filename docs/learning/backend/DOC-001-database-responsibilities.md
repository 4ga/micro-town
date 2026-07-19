# Database Responsibilities

## What belongs in the application

- Format an API response
- Send user alerts
- Send an email

## What belongs in PostgreSQL

- Prevent duplicate users and account numbers
- Ueer profiles correlate to purchases
- Purchases are associated with orders.

## What belongs in infrastructure

- Restore data
- Configure and maintain permissions
- Back up data

## Rules enforced in more than one layer

- An order quantity must be greater than zero.
- An email must be present and correctly formatted.
- A bank transfer amount must be positive.
- Only authorized hospital staff may access patient records.

## Risks of using in-memory arrays as storage

- When the application restarts, the data in the array is lost.
- Separate Node.js instances contain inconsistent data.
- Backups and recovery are unavailable.

## Questions I still have

- How all the database interact; i.e. how an update in one database triggers updates in another while maintaining accuracy.
