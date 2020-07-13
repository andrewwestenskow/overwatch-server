DROP TABLE IF EXISTS player_results_heroes;
DROP TABLE IF EXISTS player_results;
DROP TABLE IF EXISTS heroes;
DROP TABLE IF EXISTS maps;
DROP TABLE IF EXISTS game_rounds;
DROP TABLE IF EXISTS hero_roles;
DROP TABLE IF EXISTS game_modes;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS platforms;
DROP TABLE IF EXISTS users;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "email" varchar(255),
  "hash" text,
  "token" text,
  "token_expire" text
);

CREATE TABLE "platforms" (
  "id" serial PRIMARY KEY,
  "name" varchar(255)
);

CREATE TABLE "players" (
  "id" serial PRIMARY KEY,
  "name" varchar(255),
  "user_id" int,
  "platform_id" int
);

CREATE TABLE "game_modes" (
  "id" serial PRIMARY KEY,
  "name" varchar(255)
);

CREATE TABLE "hero_roles" (
  "id" serial PRIMARY KEY,
  "name" varchar(255),
  "image" text
);


CREATE TABLE "game_rounds" (
  "id" serial PRIMARY KEY,
  "name" varchar(100)
);

CREATE TABLE "maps" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "game_mode_id" int,
  "image" text
);

CREATE TABLE "heroes" (
  "id" serial PRIMARY KEY,
  "hero_role_id" int,
  "name" varchar(255) NOT NULL,
  "image" text
);


CREATE TABLE "player_results" (
  "id" serial PRIMARY KEY,
  "player_id" int,
  "map_id" int,
  "win" bool NOT NULL
);

CREATE TABLE "player_results_heroes" (
  "id" serial PRIMARY KEY,
  "player_results_id" int,
  "hero_id" int,
  "game_round_id" int
);

-- Foreign keys

ALTER TABLE "players" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "players" ADD FOREIGN KEY ("platform_id") REFERENCES "platforms" ("id");

ALTER TABLE "maps" ADD FOREIGN KEY ("game_mode_id") REFERENCES "game_modes" ("id");

ALTER TABLE "heroes" ADD FOREIGN KEY ("hero_role_id") REFERENCES "hero_roles" ("id");

ALTER TABLE "player_results" ADD FOREIGN KEY ("player_id") REFERENCES "players" ("id");

ALTER TABLE "player_results" ADD FOREIGN KEY ("map_id") REFERENCES "maps" ("id");

ALTER TABLE "player_results_heroes" ADD FOREIGN KEY ("player_results_id") REFERENCES "player_results" ("id");

ALTER TABLE "player_results_heroes" ADD FOREIGN KEY ("hero_id") REFERENCES "heroes" ("id");

ALTER TABLE "player_results_heroes" ADD FOREIGN KEY ("game_round_id") REFERENCES "game_rounds" ("id");



-- INSERT STANDARD DATA

INSERT INTO platforms (name)
VALUES ('pc'), ('xbl'), ('psn'), ('switch');

INSERT INTO game_modes (name)
VALUES ('control'), ('assault'), ('escort'), ('hybrid');

INSERT INTO hero_roles (name, image)
VALUES ('tank', 'https://overpicker.win/images/assets/tank.png'), ('damage', 'https://overpicker.win/images/assets/damage.png'), ('support', 'https://overpicker.win/images/assets/support.png');

INSERT INTO game_rounds (name)
VALUES ('attack'), ('defense'), ('control');

INSERT INTO maps (name, game_mode_id, image)
VALUES ('Busan', 1, 'https://static.playoverwatch.com/img/pages/maps/images/busan.jpg'), ('Ilios', 1, 'https://static.playoverwatch.com/img/pages/maps/images/ilios.jpg'), ('Lijiang Tower', 1, 'https://static.playoverwatch.com/img/pages/maps/images/lijiang-tower.jpg'), ('Nepal', 1, 'https://static.playoverwatch.com/img/pages/maps/images/nepal.jpg'), ('Oasis', 1, 'https://static.playoverwatch.com/img/pages/maps/images/oasis.jpg'), ('Hanamura', 2, 'https://static.playoverwatch.com/img/pages/maps/images/hanamura.jpg'), ('Horizon Lunar Colony', 2, 'https://static.playoverwatch.com/img/pages/maps/images/horizon-lunar-colony.jpg'), ('Paris', 2, 'https://static.playoverwatch.com/img/pages/maps/images/paris.jpg'), ('Temple of Anubis', 2, 'https://static.playoverwatch.com/img/pages/maps/images/temple-of-anubis.jpg'), ('Volskaya Industries', 2, 'https://static.playoverwatch.com/img/pages/maps/images/volskaya-industries.jpg'), ('Dorado', 3, 'https://static.playoverwatch.com/img/pages/maps/images/dorado.jpg'), ('Havana', 3, 'https://static.playoverwatch.com/img/pages/maps/images/havana.jpg'), ('Junkertown', 3, 'https://static.playoverwatch.com/img/pages/maps/images/junkertown.jpg'), ('Rialto', 3, 'https://static.playoverwatch.com/img/pages/maps/images/rialto.jpg'), ('Route 66', 3, 'https://static.playoverwatch.com/img/pages/maps/images/route-66.jpg'), ('Watchpoint: Gibralter', 3, 'https://static.playoverwatch.com/img/pages/maps/images/watchpoint-gibraltar.jpg'), ('Blizzard World', 4, 'https://static.playoverwatch.com/img/pages/maps/images/blizzard-world.jpg'), ('Eichenwalde', 4, 'https://static.playoverwatch.com/img/pages/maps/images/eichenwalde.jpg'), ('Hollywood', 4, 'https://static.playoverwatch.com/img/pages/maps/images/hollywood.jpg'), ('King''s Row', 4, 'https://static.playoverwatch.com/img/pages/maps/images/kings-row.jpg'), ('Numbani', 4, 'https://static.playoverwatch.com/img/pages/maps/images/numbani.jpg');


INSERT INTO heroes (name, hero_role_id, image)
VALUES ('D.Va', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/dva/icon-portrait.png'), ('Orisa', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/orisa/icon-portrait.png'), ('Reinhardt', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/reinhardt/icon-portrait.png'), ('Roadhog', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/roadhog/icon-portrait.png'), ('Sigma', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/sigma/icon-portrait.png'), ('Winston', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/winston/icon-portrait.png'), ('Wrecking Ball', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/wrecking-ball/icon-portrait.png'), ('Zarya', 1, 'https://d1u1mce87gyfbn.cloudfront.net/hero/zarya/icon-portrait.png'), ('Ashe', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/ashe/icon-portrait.png'), ('Bastion', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/bastion/icon-portrait.png'), ('Doomfist', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/doomfist/icon-portrait.png'), ('Echo', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/echo/icon-portrait.png'), ('Genji', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/genji/icon-portrait.png'), ('Hanzo', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/hanzo/icon-portrait.png'), ('Junkrat', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/junkrat/icon-portrait.png'), ('McCree', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/mccree/icon-portrait.png'), ('Mei', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/mei/icon-portrait.png'), ('Pharah', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/pharah/icon-portrait.png'), ('Reaper', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/reaper/icon-portrait.png'), ('Soldier: 76', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/soldier-76/icon-portrait.png'), ('Sombra', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/sombra/icon-portrait.png'), ('Symmetra', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/symmetra/icon-portrait.png'), ('Torbjörn', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/torbjorn/icon-portrait.png'), ('Tracer', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/tracer/icon-portrait.png'), ('Widowmaker', 2, 'https://d1u1mce87gyfbn.cloudfront.net/hero/widowmaker/icon-portrait.png'), ('Ana', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/ana/icon-portrait.png'), ('Baptiste', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/baptiste/icon-portrait.png'), ('Brigitte', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/brigitte/icon-portrait.png'), ('Lucio', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/lucio/icon-portrait.png'), ('Mercy', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/mercy/icon-portrait.png'), ('Moira', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/moira/icon-portrait.png'), ('Zenyatta', 3, 'https://d1u1mce87gyfbn.cloudfront.net/hero/zenyatta/icon-portrait.png');