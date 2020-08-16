# API Access System

## Description
An API service that can be implemented to create membership tiers and paid access to data. Provides users with a limited amount of access to endpoints based on their membership tier ('free' and 'premium').

## User Creation
For access to the API endpoints, a user must be created. <br>
To create a user: <br>
- API to send request:<br> 
```
/users/new
``` 
- Request body must contain a JSON object with the properties below: <br>
```
{
    "first_name": "< STRING >",
	"last_name": "< STRING >",
	"username": "< STRING : UNIQUE >",
	"password": "< STRING >",
	"email": "<EMAIL ADDRESS : UNIQUE >",
	"membership": "< MUST BE free OR premium >"
}
```

## API Keys
After creating a user using the above request endpoint, you will recieve a response with a generated API key that you will use for requests to the other endpoints. The API key will be associated with your user in the user table in the database, and will be associated with either the 'free' or 'premium' membership tier that you chose.

## Sample Data
### Companies
Sample company data is provided with the following endpoints: <br><br>
<strong>All Companies</strong><br>
Returns all database entries
```
/api/v1/companies
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation<br><br>

<strong>Companies by Name</strong><br>
Query company database by company name
```
/api/v1/companies/name
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation<br>
- <strong>name</strong> : a company name<br>
Test example: "Cormier Group"<br><br>

<strong>Companies by Suffix</strong><br>
Query company database by company suffix
```
/api/v1/companies/suffix
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation
- <strong>suffix</strong> : a company suffix<br>
Test Example: "LLC"<br><br>

<strong>Companies by State</strong><br>
Query company database by state address
```
/api/v1/companies/state
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation
- <strong>state</strong> : one of the 50 US states<br>
Test Example: "Florida" <br><br>

### Products
Sample products data is provided with the following endpoints: <br><br>

<strong>All Products</strong><br>
Returns all database entries
```
/api/v1/products
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation<br><br>

<strong>Products by Name</strong><br>
Query products database by product name
```
/api/v1/products/name
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation<br>
- <strong>name</strong> : a product name<br>

Test Example: "Handcrafted Granite Cheese"<br><br>

<strong>Products by Price Range</strong><br>
Query products database by price range
```
/api/v1/products/price
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation<br>
- <strong>min</strong> : the minimum price<br>
- <strong>max</strong> : the maximum price<br>
Test Example: min=200&max=500 <br><br>

<strong>Products by Color</strong><br>
Query products database by product color
```
/api/v1/products/color
```
Request Query Requirements:<br>
- <strong>key</strong> : the API key recieved from user creation<br>
- <strong>color</strong> : a color name <br>
Test Example: "grey"