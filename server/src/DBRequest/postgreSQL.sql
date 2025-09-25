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



CREATE TABLE "Conversations" (
    id serial PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
)

CREATE TABLE "Users_to_Conversations" (
    user_id INT REFERENCES "Users"(id) ON DELETE CASCADE NOT NULL,
    conversation_id INT REFERENCES "Conversations"(id) ON DELETE CASCADE NOT NULL,
    black_list boolean NOT NULL DEFAULT false,
    favorite_list boolean NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id,conversation_id)
)

CREATE TABLE "Messages" (
    id serial PRIMARY KEY,
    sender int REFERENCES "Users"(id) ON DELETE CASCADE NOT NULL,
    body TEXT NOT NULL,
    conversation INT REFERENCES "Conversations"(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
)

CREATE TABLE "Catalogs" (
    id serial PRIMARY KEY,
    user_id INT REFERENCES "Users"(id) ON DELETE CASCADE NOT NULL,
    catalog_name VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
)

CREATE TABLE "Catalogs_to_Conversations" (
    catalog_id INT REFERENCES "Catalogs"(id) ON DELETE CASCADE NOT NULL,
    conversation_id INT REFERENCES "Conversations"(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
    PRIMARY KEY (catalog_id, conversation_id),
);