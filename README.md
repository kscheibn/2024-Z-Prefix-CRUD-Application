# 2024-Z-Prefix-CRUD-Application
 CRUD application for Katherine Scheibner's 2024 Z-Prefix Assessment

## Access Instructions

You can access the app at the following link: 2024-z-prefix-crud-application-m081o5d80.vercel.app 

## Login Instructions

There are two exisitng users in the system, "user1" and "testing." The credentials of the "testing" account are:

    username: testing
    password: testing123

Four items exist in the database, and therefore, four items should initially appear on the "Global Inventory" page. The "testing" user created "Item 1" and "Item 3", so upon login, the testing user should see those two items on their "My Inventory" page. 

## Important Notes

Some of the application's features are incomplete. For example, the "Login" page does not provide feedback if/when a user inputs an incorrect username and/or password. Therefore, if you attempt to login with valid credentials and nothing appears to happen (i.e. the page appears static), the server may have processed the request but rejected the login attempt due to incorrect credentials. You may wish to double check that you have spelled the username and password correctly. 

Additionally, database API still has a few bugs. Inventory managers can toggle the "Item Details" page for an item in their inventory into an editing mode. However, they will not be able to save any changes. 
