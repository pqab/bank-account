### Bank account

A set of API using to simulate the functionality of a basic bank account.

### APIs explorer

https://bank-account.herokuapp.com/

### Dependencies

| Dependency        | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| express           | Fast and Simple framework to build api                               |
| express-validator | An express.js middleware for node-validator.                         |
| jest              | Latest JavaScript testing framework with a large community           |
| supertest         | HTTP assertions made easy with jest                                  |
| axios             | Promise based http client for fetching approval from third party API |
| mongoose          | MongoDB object modeling tool                                         |

### Testing

- Use Jest and Supertest to describe the test and defined the expected result
- Use Travis CI to trigger the test when post-received
- Will run tests under /server/tests/ directory

```
npm test
```
