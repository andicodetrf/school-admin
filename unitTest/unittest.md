## School Administration System API

## Unit Testing

#### Test Scripts
Test scripts are located in *unitTest* directory

#### Unit Test on Utility Functions 
- Unit test on validation and format utility functions found in *src/utils/index.js*

#### Unit Test on API Routes
- Unit test on Server Connection and invalid URL endpoint found in *src/controllers/HealthcheckController.js*
- Unit test on GET /api/reports/workload for workload report with Seed Data found in 
    - *database/seeders/20201015045035-school-data.js*
    - *src/controllers/HealthcheckController.js*
- Unit test on POST /register for registration with varied input format found in *src/controllers/Register.js*
- Unit test on POST /register/update for update with varied input format found in *src/controllers/UpdateRecord.js*

<br> 

### Instructions to run tests
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
