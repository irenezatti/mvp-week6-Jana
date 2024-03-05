
SET foreign_key_checks = 0;
drop table if exists game;
drop table if exists quotes_info;
drop table if exists users;
SET foreign_key_checks = 1;

CREATE TABLE `game`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `game_total` INT NOT NULL
);
CREATE TABLE `quotes_info`(
    `question_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `quote_text` TEXT NOT NULL,
    `solution_char` VARCHAR(255) NOT NULL,
    `user_answer` VARCHAR(255) NOT NULL,
    `result_points` TINYINT NOT NULL,
    `game_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `total_points` INT NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `game` ADD CONSTRAINT `game_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `quotes_info` ADD CONSTRAINT `quotes_info_game_id_foreign` FOREIGN KEY(`game_id`) REFERENCES `game`(`id`);