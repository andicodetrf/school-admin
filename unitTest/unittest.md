## School Administration System API

## Unit Testing

#### Test Scripts
Test scripts are located in *unitTest* directory

#### Unit Test on Utility Functions (unitTest/utils)
- Unit test on validation and format utility functions 

#### Unit Test on API Routes (unitTest/controllers)
- Unit test on Server Connection and invalid URL endpoint
- Unit test on GET /api/reports/workload for workload report with Seed Data
- Unit test on POST /api/register for registration with varied input format 
- Unit test on POST /api/register/update for update with varied input format
<br> 

### Instructions to run tests
1. Ensure the Docker mysql container is connected and running

<br>

2. Clear out all data in DB before Unit-Test
```
sequelize db:seed:undo:all 
```

3. Seed data in DB before Unit-Test
```
sequelize db:seed:all
```

4. Run the following command to execute all test scripts
```
npm test
```

Data inserted into DB during the tests will be cleared out after all tests.
