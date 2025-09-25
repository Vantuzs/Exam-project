Running Docker containers in development mode

- Command to start building images and containers: ./start-dev.sh || sudo bash start-dev.sh
Running Docker containers in development mode

- The application starts at: 172.0.:3000

BUG FIXED

Fixed display of user photos/avatars, fixed display of notifications, and fixed some minor layout issues.

MARKUP

The "ATOM" page has been added, with a link in the header.

The "EVENTS" page has been added, with a link in the header.

The ButtonGroup component has been added, accessed by: Start a contest/select any contest/scroll to the bottom.

NO-SQL DB

The task execution path is located at server/src/DBRequest/MongoDB.js

SQL DB

The task execution path is server/src/DBRequest/postgreSQL.sql

NODEJS

The error logger server/handleError has been created.

ErrorLogHandler

A schedule has been created to copy and clear the contents of the error.log file and transfer the data to a new file.

logs/newFile

FULLSTACK

A new "Moderator" role has been added.

Added email notifications for moderator decisions in Creative.

MOVE CHAT FROM MONGO TO POSTGRES

Described: Sequelize models and migrations

Changed server request logic

The application runs at: 172.0.:3000

BUG FIXED

Fixed the display of user photos/avatars, fixed the display of notifications, and corrected some minor layout details.

MARKUP

Created "ATOM" page

Created "EVENTS" page

Sde

NO-SQL DB/SQL DB

The task is executed at server/src/DBRequest

NODEJS

Created error logger server/handleError

ErrorLogHandler

Created a schedule for copying and clearing the contents of the error.log file and transferring the data to a new file.

logs/newFile

FULLSTACK

Added a new "Moderator" role.

Added email notifications for moderator decisions in Creative.

MOVE CHAT FROM MONGO TO POSTGRES

Described Sequelize models and migrations

Changed server request logic