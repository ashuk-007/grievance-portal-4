# GRIEVANCE PORTAL 4

pending tasks: 
1. ~~logout~~
2. ~~user permissions~~
3. ~patch requests~
4. ~~passing functionality + update functionality depending on the request, changes to be made in the controller~~
5. ~~action history object in complaint schema~~
6. ~~populate with proper officers~~ remove test officers when you're done
7. ~geotagging~ -> vishesh will integrate this
8. ~notification system -> priyo will try this~
9. ~~mailing -> for utsav, authenticate if the mail is valid and then send a mail everytime the action history gets updated. ps.(try put the mailing functionality in that addFeedback schema function somehow so that you don't have to do extra work)~~
10. ~edit profile users~
11. ~edit profile officers~
12. ~~register officer but only admin can do it -> for utsav~~
13. ~~send reminders to officers~~
14. ~~populate the database~~
15. ~~sms updates~~


The Grievance Portal is a web application that provides a platform for users to communicate and address grievances. It simplifies the process of listing and managing grievances, allowing users to interact with admins and seek resolutions. The application is built using ReactJS for the frontend, NodeJS for the backend, MongoDB as the database, and Tailwind CSS for styling.

## Features

- User Registration and Login: Users can register and login to the portal using their credentials, which allows them to submit and manage grievances.
- Grievance Submission: Registered users can submit grievances by providing relevant details such as grievance type, description, and supporting documents.
- Officer Dashboard: Officers can access a dedicated dashboard that displays all the submitted grievances, allowing them to manage and track the status of each grievance.
- Grievance Status Tracking: Users can view the status of their submitted grievances, which is updated by the Officers as the grievances progress through different stages of resolution.
- Officers Response and Resolution: Officers can communicate with users through the portal and provide responses to grievances. They can also update the status of grievances and mark them as resolved. Also they can forward a particular grievance to the officer at a higher level
- User Profile Management: Users can manage their profile information, including updating their contact details and viewing their submitted grievances.

## Technologies Used

- Frontend: ReactJS, Tailwind CSS
- Backend: NodeJS
- Database: MongoDB

## Contributors

This project is contributed by the following team members:

- Priyadarshini Roy
- Vishesh Vijayvargiya
- Utsav Singh Tomar
- Mehak Gupta
- Keshav Pandey

## Installation

To run the Grievance Portal locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies for both frontend and backend using `npm install` command.
3. Set up the MongoDB database and configure the connection settings in the backend.
4. Start the backend server using `npm run start` command in the server directory.
5. Start the frontend server using `npm run dev` command in the client directory.
6. Access the application in your web browser at `http://localhost:5173`.


## License

The Grievance Portal project is open-source and released under the [IIITA License](LICENSE).

## Contact Information

For any inquiries or suggestions regarding the Grievance Portal, please contact the project contributors:

- Priyadarshini Roy: [iit2021133@iiita.ac.in](mailto:iit2021133@iiita.ac.in)
- Vishesh Vijayvargiya: [iit2021114@iiita.ac.in](mailto:iit2021114@iiita.ac.in)
- Utsav Singh Tomar: [iit2021112@iiita.ac.in](mailto:iit2021112@iiita.ac.in)
- Mehak Gupta: [iit2021143@iiita.ac.in](mailto:iit2021143@iiita.ac.in)
- Keshav Pandey: [iit2021173@iiita.ac.in](mailto:iit2021173@iiita.ac.in)
