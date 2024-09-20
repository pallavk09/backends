# backends

Backend Node JS based code.

# AppWrite response

In Appwrite, the fields prefixed with a `$` (such as `$id`, `$permissions`, `$createdAt`, `$updatedAt`, `$databaseId`, and `$collectionId`) are metadata automatically added by Appwrite to documents created in the database. These fields contain important information related to document management and Appwrite's internal systems.

Currently, there is no direct way to prevent these fields from being included when you create a document. However, you can filter them out when retrieving or displaying the data in your application by excluding them in your response handling.

For example, if you're using JavaScript, you could filter out these fields like this:

```javascript
const filteredUser = Object.fromEntries(
  Object.entries(newUser).filter(([key]) => !key.startsWith("$"))
);
```

This will create a new object (`filteredUser`) that contains only the fields that do not start with `$`.

You can apply a similar approach in other languages or frameworks depending on your use case.

# AppWrite excluding metadata

Certainly! Let's break down what’s happening in the code snippet I shared:

### Problem:

When you create a new user in Appwrite using `database.createDocument`, Appwrite automatically adds some metadata fields that are prefixed with a `$` (like `$id`, `$permissions`, `$createdAt`, etc.). You want to exclude these fields from the result when you retrieve the user data.

### Solution:

You can filter out these fields programmatically after you receive the response. One way to do this in JavaScript is by processing the object to remove all keys that start with a `$`.

### Explanation of the Code:

```javascript
const filteredUser = Object.fromEntries(
  Object.entries(newUser).filter(([key]) => !key.startsWith("$"))
);
```

Here’s a detailed explanation of each part:

1. **`Object.entries(newUser)`**:

   - This function converts the `newUser` object into an array of key-value pairs.
   - For example, for the input object:

   ```javascript
   newUser = {
     userId: "66ed694d0002ac15c266",
     phone: "+918580370340",
     $id: "66ed694d002ec6fe13bf",
     $createdAt: "2024-09-20T12:23:42.070+00:00",
     role: "student",
   };
   ```

   It becomes an array like this:

   ```javascript
   [
     ["userId", "66ed694d0002ac15c266"],
     ["phone", "+918580370340"],
     ["$id", "66ed694d002ec6fe13bf"],
     ["$createdAt", "2024-09-20T12:23:42.070+00:00"],
     ["role", "student"],
   ];
   ```

2. **`.filter(([key]) => !key.startsWith('$'))`**:

   - The `filter` method is used to create a new array that includes only the key-value pairs where the key does **not** start with `$`.
   - `([key]) => !key.startsWith('$')` is an arrow function that checks if the key starts with a `$` character. If the key starts with `$`, it will exclude it from the filtered array.
   - After filtering, the array might look like this:

   ```javascript
   [
     ["userId", "66ed694d0002ac15c266"],
     ["phone", "+918580370340"],
     ["role", "student"],
   ];
   ```

3. **`Object.fromEntries()`**:
   - This method takes the filtered array of key-value pairs and converts it back into an object.
   - So after applying `Object.fromEntries()`, the final object (`filteredUser`) will be:
   ```javascript
   {
       "userId": "66ed694d0002ac15c266",
       "phone": "+918580370340",
       "role": "student"
   }
   ```

### End Result:

You now have a `filteredUser` object that no longer includes the fields that were prefixed with `$`, leaving you with just the fields you care about.

This approach allows you to easily remove the metadata fields from Appwrite responses when you display or process the user data in your application.

# Dummy Payload - CreateNewStudent

{
"userId": "66ed6c390012595e90ab",
"studentObj": {
"id": "1",
"personalDetails": {
"studentfullname": "Pallav Kumar",
"addressline1": "New Delhi Tent House",
"addressline2": "Bus Stand, Jail Hata",
"addresscity": "Daltonganj",
"addressstate": "Jharkhand",
"addresspincode": "822101",
"studentdob": "13/06/1990",
"studentgender": "Male"
},
"guardianDetails": {
"guardianname": "Mukul Vishwakarma",
"studentrelation": "Father",
"occupation": "Business",
"guardianphoneno": "+918580370340",
"guardianemailid": "pallavk09@gmail.com"
},
"academicsDetails": {
"class": "CLASS-I",
"section": "B",
"rollnumber": "12",
"housename": "House1",
"busnumber": "Bus1"
},
"newAdmission": false
}
}

# Dummy Payload - ListStudents

{
"userId": "66ed6c390012595e90ab"
}
