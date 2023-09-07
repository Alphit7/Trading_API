# Mini Trading App API

This repository contains the backend API for a mini trading app challenge.

## Challenge Description

For this challenge, you will build a mini (fake) trading app as an API. Through API calls, users will be able to open simple positions (buy) and close them later (sell everything at once).


## Authentication

Due to the sensitive nature of financial operations, the API requires authentication. Implementing token-based authentication, such as JWT (JSON Web Token), is recommended.

## Random Notes

### Check the Buying Power

Users shouldn't be able to open positions larger than their account balance.

### Example of Request

An example request might be: "Buy 123 $TSLA shares". The backend must verify the user's balance and compute the total value of the requested trade.

### Endpoints API

| Method | Route                    | Description                                           |
|--------|--------------------------|-------------------------------------------------------|
| GET    | /api/login               | User login                                           |
| POST   | /api/signup              | User signup                                          |
| POST   | /api/wire                | Deposit or withdraw funds                            |
| GET    | /api/profile             | Fetch user profile data                              |
| PATCH  | /api/update              | Update user profile (excluding balance)              |
| GET    | /api/trades/index        | Fetch all trades                                     |
| GET    | /api/trades/:id          | Fetch details of a specific trade                    |
| GET    | /api/trades/index/open   | Fetch all open trades                                |
| GET    | /api/trades/index/closed | Fetch all closed trades                              |
| POST   | /api/openTrade/          | Open a long position (buy)                           |
| POST   | /api/closeTrade/:id      | Close a position                                     |
| GET    | /api/closedPNL           | Return total closed Profit and Loss (PNL)            |
| GET    | /api/openPNL             | Return total open PNL                                |
| GET    | /api/currentBalance      | Return current account balance (excluding open PNL) |


## Some Nice Features to Explore

- Implement email or SMS notifications for users when they incur losses on closed positions.

---
Article and challenge originally provided by [BeCode](https://github.com/becodeorg/CRL-Wilson-2).

Created by [Sylvain Jacobs](https://github.com/Alphit7)
