# Social Network API

## Description

This project demonstrates the kind of API that would be used on a social network app. It uses flexible, unstructured data to store Users, Thoughts, and Reactions. This project leveraged MongoDB and the Mongoose ODM.

## Installation

GitHub repository: https://github.com/lucygouvin/social-network-api <br/>
To run the project, run "npm start" in the terminal.

## Usage

By providing information via HTTP requests, the user can:
* Create a new user, edit an existing user, or delete a user
* Add or remove other users from their friends list
* Create a new thought, edit an existing thought, or delete a thought
* Add or delete a reaction to a thought

For requests to create or edit a user, thought, or reaction, the user must provide a request body with the required fields.  <br/>
For requests to delete a user, friend, thought, or reaction, or requests to add a friend, the user needs to provide the relevant object id(s) as query parameters in the URL.

Walkthrough video: https://drive.google.com/file/d/1ureAm80HHXgXzclVAWA_lSsJyjj2s0cG/view

## Credits

N/A

## License

Please refer to the license in the repository.