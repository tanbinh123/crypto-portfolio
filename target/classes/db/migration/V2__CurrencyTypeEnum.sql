CREATE TYPE currency_type AS ENUM('Bitcoin', 'Ethereum', 'Ripple');

ALTER TABLE item
ALTER COLUMN currency_type TYPE currency_type
USING (currency_type::currency_type);