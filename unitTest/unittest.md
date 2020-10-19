## School Administration System API

## Unit Testing

### Utility Functions
- Unit test on validation and format utility functions

### API Routes
- Unit test on Server Connection and invalid URL endpoint
- Unit test on GET /api/reports/workload for workload report with Seed Data
- Unit test on POST /register for registration with varied input format
- Unit test on POST /register/update for update with varied input format

### Instructions
1. Clear out all data in DB before Unit-Test
```
sequelize db:seed:undo:all 
```

2. Seed data in DB before Unit-Test
```
sequelize db:seed:all
```

3. Run the following command to execute all test scripts
```
npm test
```

Data inserted into DB during the tests will be cleared out after all tests.
