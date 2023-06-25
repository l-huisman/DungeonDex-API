-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Jun 24, 2023 at 03:38 PM
-- Server version: 10.10.2-MariaDB-1:10.10.2+maria~ubu2204
-- PHP Version: 8.1.17
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
    time_zone = "+00:00";

--
-- Database: `dungeondex`
--
DROP DATABASE IF EXISTS `dungeondex`;

CREATE DATABASE IF NOT EXISTS `dungeondex` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE `dungeondex`;

-- --------------------------------------------------------
--
-- Table structure for table `creatures`
--
CREATE TABLE `creatures` (
    `id` int(11) NOT NULL,
    `name` varchar(255) NOT NULL,
    `description` text NOT NULL,
    `size` enum(
        'Tiny',
        'Small',
        'Medium',
        'Large',
        'Huge',
        'Gargantuan'
    ) NOT NULL,
    `type` enum(
        'Aberration',
        'Beast',
        'Celestial',
        'Construct',
        'Dragon',
        'Elemental',
        'Fey',
        'Fiend',
        'Giant',
        'Humanoid',
        'Monstrosity',
        'Ooze',
        'Plant',
        'Undead'
    ) NOT NULL,
    `subtype` enum(
        'Aberration',
        'Beast',
        'Celestial',
        'Construct',
        'Dragon',
        'Elemental',
        'Fey',
        'Fiend',
        'Giant',
        'Humanoid',
        'Monstrosity',
        'Ooze',
        'Plant',
        'Undead'
    ) DEFAULT NULL,
    `alignment` enum(
        'Lawful Good',
        'Neutral Good',
        'Chaotic Good',
        'Lawful Neutral',
        'Neutral',
        'Chaotic Neutral',
        'Lawful Evil',
        'Neutral Evil',
        'Chaotic Evil',
        'Unaligned'
    ) NOT NULL,
    `armorClass` int(11) NOT NULL,
    `hitPoints` int(11) NOT NULL,
    `hitDice` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`hitDice`)),
    `speed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`speed`)),
    `abilityScores` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`abilityScores`)),
    `proficiencies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`proficiencies`)),
    `damageVulnerabilities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`damageVulnerabilities`)),
    `damageResistances` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`damageResistances`)),
    `damageImmunities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`damageImmunities`)),
    `conditionImmunities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditionImmunities`)),
    `senses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`senses`)),
    `languages` enum(
        'Common',
        'Dwarvish',
        'Elvish',
        'Giant',
        'Gnomish',
        'Goblin',
        'Halfling',
        'Orc',
        'Abyssal',
        'Celestial',
        'Draconic',
        'Deep Speech',
        'Infernal',
        'Primordial',
        'Sylvan',
        'Undercommon'
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `challengeRating` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`challengeRating`)),
    `specialAbilities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`specialAbilities`)),
    `actions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`actions`)),
    `legendaryActions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`legendaryActions`))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `creatures`
--
INSERT INTO
    `creatures` (
        `id`,
        `name`,
        `description`,
        `size`,
        `type`,
        `subtype`,
        `alignment`,
        `armorClass`,
        `hitPoints`,
        `hitDice`,
        `speed`,
        `abilityScores`,
        `proficiencies`,
        `damageVulnerabilities`,
        `damageResistances`,
        `damageImmunities`,
        `conditionImmunities`,
        `senses`,
        `languages`,
        `challengeRating`,
        `specialAbilities`,
        `actions`,
        `legendaryActions`
    )
VALUES
    (
        1,
        'Goblin',
        'Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings. Individually weak, they gather in large numbers to torment other creatures.',
        'Small',
        'Humanoid',
        NULL,
        'Neutral Evil',
        15,
        7,
        '{\"diceCount\": 2, \"diceSides\": 6, \"diceBonus\": 0}',
        '{\"walk\": 30}',
        '{\"strength\": 8, \"dexterity\": 14, \"constitution\": 10, \"intelligence\": 10, \"wisdom\": 8, \"charisma\": 8}',
        '{\"value\": 6, \"proficiency\": {\"index\": \"stealth\", \"name\": \"Stealth\"}}',
        NULL,
        NULL,
        NULL,
        NULL,
        '{\"type\": \"darkvision\", \"value\": 60}',
        'Goblin',
        '{\"value\": 0.25, \"experience\": 50}',
        '{\"name\": \"Nimble Escape\", \"desc\": \"The goblin can take the Disengage or Hide action as a bonus action on each of its turns.\", \"usage\": null}',
        '[{\"name\": \"Scimitar\", \"description\": \"Melee Weapon Attack: + 4 to hit, reach 5 ft., one target.Hit: 5 (1d6 + 2) slashing damage.\", \"attackBonus\": 4, \"damage\": {\"damageDice\": { \"diceCount\": 2, \"diceSides\": 6, \"diceBonus\": 0 }, \"damageType\":{\"index\": \"slashing\", \"name\": \"Slashing\"}}}, {\"name\": \"Shortbow\", \"description\": \"Ranged Weapon Attack: + 4 to hit, range 80/320 ft., one target.Hit: 5 (1d6 + 2) piercing damage.\", \"attackBonus\": 4, \"damage\": {\"damageDice\": { \"diceCount\": 1, \"diceSides\": 6, \"diceBonus\": 0 }, \"damageType\":{\"index\": \"piercing\", \"name\": \"Piercing\"}}}]',
        NULL
    );

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
    `id` int(11) NOT NULL,
    `email` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `users`
--
INSERT INTO
    `users` (`id`, `email`, `username`, `password`)
VALUES
    (
        1,
        'luke.huisman@yahoo.nl',
        'Fantasia',
        '$2b$16$uAW9Z88a1SOQs.WKU9P8YOZnhVhOAIu/NOBon6ZTxMPb0NfnkgAbe'
    );

--
-- Indexes for dumped tables
--
--
-- Indexes for table `creatures`
--
ALTER TABLE
    `creatures`
ADD
    PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE
    `users`
ADD
    PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `creatures`
--
ALTER TABLE
    `creatures`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE
    `users`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 2;

COMMIT;