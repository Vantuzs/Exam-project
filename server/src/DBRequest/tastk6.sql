// task 7
SELECT role, COUNT(*) AS count
FROM "Users"
GROUP BY role;

// task 8
UPDATE "Users" AS u
SET balance = u.balance + sub.ten
FROM (
    SELECT c."userId",SUM(c.prize) * 0.1 AS ten
    FROM "Contests" AS c
    WHERE c.status = 'finished' 
    AND c."createdAt" BETWEEN '2024-12-14' AND '2025-01-14'
    GROUP BY c."userId"
) AS sub
WHERE u.id = sub."userId";



// task 9
UPDATE "Users" AS u SET balance = u.balance + 10
FROM (
    SELECT * FROM "Users" AS u
WHERE rating > 0
ORDER BY rating DESC
LIMIT 3
) AS top
WHERE u.id = top.id


// task 6 



CREATE TABLE "Conversation" (
    id serial PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
)

CREATE TABLE "Users_to_Conversations" (
    user_id INT REFERENCES "Users"(id) ON DELETE CASCADE,
    conversation_id INT REFERENCES "Conversation"(id) ON DELETE CASCADE,
    black_list boolean DEFAULT false,
    favorite_list boolean DEFAULT false,
    PRIMARY KEY (user_id,conversation_id)
)

CREATE TABLE "Messages" (
    id serial PRIMARY KEY,
    sender int REFERENCES "Users"(id) ON DELETE CASCADE,
    body TEXT,
    conversation INT REFERENCES "Conversation"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
)

CREATE TABLE "Catalogs" (
    id serial PRIMARY KEY,
    user_id INT REFERENCES "Users"(id) ON DELETE CASCADE,
    catalogName VARCHAR(64),
    conversation INT REFERENCES "Conversation"(id) ON DELETE CASCADE
)

INSERT INTO "Conversation" DEFAULT VALUES

INSERT INTO "Users_to_Conversations" (user_id,conversation_id)VALUES
(1,1)

INSERT INTO "Messages" (sender,body,conversation) VALUES
(1,'Hello',1)

SELECT u."firstName", m.body,utc.black_list,utc.favorite_list,m.created_at FROM "Users" as u
JOIN "Users_to_Conversations" as utc ON u.id = utc.user_id
JOIN "Messages" as m ON m.sender = u.id
ORDER BY m.created_at;


UPDATE "Offers" as o SET "isModerated" = true
WHERE o.id = 105