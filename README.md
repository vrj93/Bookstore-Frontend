# Bookstore Frontend

## Bookstore with React.js + Vite + Bootstrap

## Frontend Routes

1. "/" : Bookstore Search page
2. "/book/:id" : Book details page
3. "/admin" : Admin Login page
4. "/admin/book" : Admin Bookstore management page

## Overview

This Application contains a main page where user can search for book titles with filters that includes title, author, genre, ISBN, Published date and Publisher. Additionally, Pagination is added that is handled by API itself instead of React Datatable. For styling purpose basic bootstrap classes are used for all components.

By clicking Book Title, User will be redirected to the book details page where all information regarding a book will be furnished.

On the Admin side, the same API is called for fetching the books. To edit or Add books, Modal is used instead of separate pages. Front-end validation is implemented in the login form for showing purposes, but execution will be terminated by backend validation with an Alert only.

Routing is implemented to separate authenticated routes with redirects. So that an unauthorised person cannot access the "admin/book" frontend route where Admin can make bookstore modifications. 

For authentication purposes, Cookie is set with the help of a token that is received in the Login API response. This token will be used to access Backend APIs which require authentication such as Add/Edit/Delete books. On the front end, the existence of a Cookie will determine, if the user will be redirected to Admin/book page or Admin's login page.

Separation of code is not followed due to the number of files being quite few compared to production-level applications. Hence, codes related to API calls are in the same files as Components instead of "hooks" or "utilities".

## Technology

1. React.js 18
2. Vite
3. Bootstrap 5
4. ECMA Script
5. React Modules
