CREATE TYPE currencyType AS ENUM('Bitcoin', 'Ethereum', 'Ripple');


CREATE TABLE IF NOT EXISTS item(
        item_id int PRIMARY KEY NOT NULL,
        currency_type VARCHAR(10) NOT NULL,
        amount int NOT NULL,
        created_at DATE NOT NULL,
        wallet_location VARCHAR(100) NOT NULL,
        market_price float NOT NULL
);

