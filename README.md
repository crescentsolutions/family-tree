![Crescent Media Logo](https://www.crescentdigitalmedia.solutions/wp-content/uploads/2020/05/logo-v3.png)

# Application Title: Family Tree Server

This app is a server that houses a MongoDB for the Client's Family Tree. Users will use the Client App to input their family members and the data is stored here for future use.

Repository: https://github.com/crescentsolutions/family-tree
Live Server: https://stormy-gorge-66260.herokuapp.com/

Accompanying App: Family Tree Client
Repository: https://github.com/crescentsolutions/family-tree-client
Live Site: https://crescentsolutions.github.io/family-tree-client/


## Wireframe:
![Project 2 - Full Stack](https://media.git.generalassemb.ly/user/30423/files/a221c280-f8d7-11ea-825c-39ed4926c828)

## ERD
<a href="https://ibb.co/t4nphz8"><img src="https://i.ibb.co/6mG0Z8g/20201001-164639.jpg" alt="20201001-164639" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>pic share</a><br />

## User Stories:

- As a User I want a form so that I can sign up [POST]
- As a User I want a form so that I can sign in [GET]
- As a User I want a form so that I can change my password [PATCH]
- As a User I want a form so that I can sign out [DELETE]
- As a User I want a dashboard so that I can view my objects and options [GET]
- As a User I want a button so that I can create a new generation
- As a User I want a form so that I can add a new generation [POST]
- As a User I want a process to edit my generation [PATCH]
- As a User I want a button to delete a generation [DELETE]

## Process for Building Express API
1. Create auth folder to contain .sh files for curl scripts /curl-scripts/auth
2. Create .sh files for each curl script I need to test
      - ex: /curl-scripts/auth/sign-in.sh,
          -- /curl-scripts/auth/sign-up.sh,
          -- etc.
3. Test the API using curl scripts in /curl-scripts/auth
4. Create data models for family members
5. Create curl scripts for family members and test
4. Create routes for family members based on data models and curl scripts
5. Test routes
6. Initialize the process that does error handling.

In the future I would like to fix some of my error handling and make the message more specific to the situation.

## Technologies Used
- Express
- MongoDB
- Mongoose
