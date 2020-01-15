CREATE TABLE IF NOT EXISTS item(
        item_id int PRIMARY KEY NOT NULL,
        currency_type VARCHAR(10) NOT NULL
            CHECK(
            currency_type = 'Bitcoin' OR
            currency_type = 'Ethereum' OR
            currency_type = 'Ripple'
        ),
        amount int NOT NULL,
        created_at DATE NOT NULL,
        wallet_location VARCHAR(100) NOT NULL,
        market_price float NOT NULL
);

