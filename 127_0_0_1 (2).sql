-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 11 déc. 2024 à 09:17
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `blog`
--
CREATE DATABASE IF NOT EXISTS `blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `blog`;

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `source` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `underCategory_id` int NOT NULL,
  `undercategory_name` varchar(100) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `underCategory_id` (`underCategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`id`, `title`, `content`, `created_at`, `source`, `underCategory_id`, `undercategory_name`, `category_name`, `image_url`) VALUES
(6, 'l\'Inclusion Web', 'L\'Importance de l\'Inclusion Web : Rendre le Web Accessible à Tous\r\nL\'internet est un espace où nous avons tous la possibilité d\'apprendre, de partager et de créer. Pourtant, pour beaucoup de personnes en situation de handicap, ce vaste espace numérique peut encore être semé d\'obstacles. C\'est là qu\'intervient l\'inclusion web, un ensemble de bonnes pratiques qui visent à rendre les sites accessibles et utilisables par tous, sans exception.\r\n\r\nQu\'est-ce que l\'inclusion web ?\r\nL\'inclusion web, ou accessibilité numérique, consiste à concevoir des sites et des applications web de manière à ce qu\'ils puissent être utilisés par des personnes avec des handicaps visuels, auditifs, moteurs ou cognitifs. Cela signifie qu\'une personne malvoyante devrait pouvoir naviguer sur un site web via un lecteur d\'écran, ou qu\'une personne ayant des difficultés à utiliser une souris puisse interagir avec un site en utilisant uniquement son clavier.', '2024-10-08 11:48:45', NULL, 4, 'Web', 'Informatique', '/public/assets/images/depositphotos_111396430-stock-photo-blind-person-using-computer-with.jpg'),
(8, 'Le World Wide Web Consortium', 'La Validation d’un Site Web avec le World Wide Web Consortium  est une étape essentielle pour s’assurer que le site respecte les standards du web, garantissant ainsi une meilleure compatibilité, accessibilité et performance.\r\nLorsque vous validez un site via les outils du W3C, vous vérifiez que le code HTML, CSS, ou autre technologie web utilisé est conforme aux spécifications définies par le consortium. Cette validation permet de détecter et corriger les erreurs de code qui pourraient empêcher certains utilisateurs d’accéder correctement au site ou nuire à son référencement sur les moteurs de recherche', '2024-10-15 11:28:31', NULL, 4, 'Web', 'Informatique', '/public/assets/images/inclusion_web_3wc.webp'),
(9, 'Meta Quest 3 : Explorez de nouveaux mondes en réalité mixte', 'la plateforme a annoncé le 1er juin, que le Meta Quest 3 était actuellement en phase de développement et qu’il sera disponible d’ici l’automne. Le casque sera équipé de deux caméras de couleurs et de trois capteurs en façade, afin de garantir une expérience plus qualitative.\r\n\r\nBasé sur la réalité mixte, le Meta Quest 3 permettra à ses utilisateurs de jouer à plusieurs dans la même pièce en s’adaptant à l’environnement dans lequel ils se trouvent. La taille du casque sera également réduite de 40% par rapport au précédent grâce à des lentilles « pancake ». En parallèle, les autres casques de Meta vont également être mis à jour afin d’augmenter leurs performances.\r\n\r\nLe Meta Quest 3 sera donc disponible au prix de 569,99 euros. Meta annoncera la date officielle lors de sa conférence qui se tiendra le 27 septembre.', '2024-10-18 15:48:22', NULL, 6, 'Meta oculus Quest', 'Réalité virtuelle', '/public/assets/images/oculus.webp'),
(10, 'Avec Hello Charly, IBM France oriente 600 jeunes vers l\'IT', 'Développeur d\'une application d\'orientation scolaire et professionnelle, Hello Charly avec la filliale française d\'IBM lancent un projet pilote pour former des lycéens et des personnes hors du système scolaire ou sans emploi aux métiers de la cybersécurité, de l\'IA et de la blockchain. L\'accès à la plateforme d\'apprentissage Skillsbuild du fournisseur sera proposée à 600 apprenants de 16 à 25 ans.', '2024-10-18 16:31:05', NULL, 7, 'Software', 'Informatique', '/public/assets/images/charly.webp'),
(11, 'Snapdragon 8 Elite : La nouvelle puce de Qualcomm pour smartphones est enfin dévoilée\r\n', 'Qualcomm a lancé une nouvelle puce pour smartphone haut de gamme, le Snapdragon 8 Elite. Adieu les Snapdragon 8 Gen X et donc, le 8 Gen 4 mort-né au final, cette nouvelle puce qui équipera les smartphones premium les plus onéreux du marché, adopte une nouvelle architecture interne. Le but : réduire la consommation et […]\r\n\r\nQualcomm a lancé une nouvelle puce pour smartphone haut de gamme, le Snapdragon 8 Elite. Adieu les Snapdragon 8 Gen X et donc, le 8 Gen 4 mort-né au final, cette nouvelle puce qui équipera les smartphones premium les plus onéreux du marché, adopte une nouvelle architecture interne. Le but : réduire la consommation et améliorer les performances, comme toujours.\r\n\r\nQualcomm a toutefois surpris tout le monde en lançant un Snapdragon 8 Elite et non pas un 8 Gen 4, cependant, le changement d’architecture de cette nouvelle puce qui succède au Snapdragon 8 Gen 3 explique le changement de nom. En effet, ici, Qualcomm rapproche le nom de ce SoC de celui des puces Snapdragon X Plus et Elite pour ordinateurs portables.\r\nLire la suite sur https://www.tomshardware.fr/snapdragon-8-elite-la-nouvelle-puce-de-qualcomm-pour-smartphones-est-enfin-devoilee/', '2024-10-22 11:39:13', NULL, 8, 'Hardware', 'Informatique', '/public/assets/images/snapdragon.webp'),
(12, 'Apple face au défi d\'un casque Vision Pro abordable et grand public', 'Apple n\'a pas vendu beaucoup de Vision Pro depuis qu\'il a lancé ce casque de réalité mixte en début d\'année. Ce n\'est pas vraiment une surprise, compte tenu de son prix exorbitant de 3 499 dollars HT. Pourtant, à long terme, la firme à la pomme voudrait rendre sa plateforme d\'informatique spatiale accessible à des consommateurs plus grand public... à condition de la rendre plus accessible. Ce dernier point est un des objectifs prioritaires du Vision Products Group (VPG) d\'Apple. Pour l\'atteindre, ce département travaille sur une nouvelle version du Vision Pro, dont le nom de code est actuellement N107.', '2024-10-22 11:41:12', NULL, 9, 'Apple vision pro', 'Réalité virtuelle', '/public/assets/images/apple.webp'),
(13, 'la nouvelle nintendo switch ', 'La nouvelle Nintendo Switch est la !, promettant une expérience de jeu encore plus immersive et innovante. Parmi ses caractéristiques phares, on retrouve un écran OLED plus grand et lumineux, une meilleure autonomie de la batterie, et des performances améliorées grâce à un processeur plus puissant.\r\n\r\nAvec un design élégant et une compatibilité renforcée avec les accessoires existants, cette console s’annonce comme un incontournable pour les fans de jeux vidéo. Préparez-vous à redécouvrir vos titres préférés avec une fluidité et une qualité visuelle exceptionnelles !', '2024-11-20 14:58:20', NULL, 10, 'Console', 'Jeu vidéo', '/public/assets/images/nintendo.webp'),
(15, 'Petit Island Nintendo Switch', 'Alors que les températures tombent en flèche et que les médias se demandent comme chaque année ce qui provoque ces variations étranges (spoiler: c\'est l\'hiver!)  on vous  vous propose de vous réchauffer avec le nouveau jeu d\'exploration tout mignon dénommé Petit Island. Développé par Xelo Games, le titre est disponible dès à présent sur Nintendo Switch et supports concurrents en dématérialisé, mais également en version physique.', '2024-12-05 18:27:07', NULL, 11, 'Gaming', 'Jeu video', '/public/assets/images/petit_island.webp');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `category_name`, `image_url`) VALUES
(1, 'Informatique', 'L\'informatique est un domaine en pleine évolution, jouant un rôle central dans notre quotidien. Elle impacte tous les aspects de notre vie, que ce soit au travail, dans la communication ou pour l\'accès aux informations. Rester informé des dernières avancées et des innovations qui transforment notre monde numérique.', 'Informatique', ''),
(2, 'Réalité virtuelle', 'La réalité virtuelle est en train de révolutionner les expériences immersives, principalement grâce aux casques VR de pointe développés par des leaders comme Meta et Apple. Découvrez comment cette technologie change notre façon de vivre le virtuel, avec des applications qui vont bien au-delà du simple divertissement.', 'Réalité virtuelle', NULL),
(3, 'Jeu vidéo', 'Le jeu vidéo est une industrie dynamique et en constante évolution, captivant des millions de joueurs à travers le monde. Entre innovations technologiques, expériences narratives immersives et compétitions eSport, il continue de redéfinir les limites du divertissement interactif. Explorez les dernières tendances, sorties et événements marquants de cet univers fascinant.', 'Jeu vidéo', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  `status` enum('approved','pending','spam') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `article_id` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `content`, `created_at`, `user_id`, `article_id`, `status`) VALUES
(147, 'Chargés des travaux pénibles et utiles sur les langues ; jeunes gens, elle abrite sans doute autre chose à la fois, d\'un beau jour. Porté par ses talents, n\'épargnez aucune peine pour moi et, très heureusement, l\'arrivée de sa réponse aux deux généraux et', '2024-12-10 17:31:41', 37, 10, 'pending'),
(211, 'Jetez ces cartes, le monceau lui apparut une toute petite ! Souvenez-vous de cette chose toujours attirante, qui fascine et qui dévore ; tantôt elles penchent la tête avec la reine qu\'il était enfermé, et voulaient laisser aux bateaux pleins de guerriers ', '2024-12-10 23:22:53', 37, 8, 'pending'),
(212, 'Lâche ton arme, et de juges ingrats dont le poète espère en vain récompense. Incapable d\'en entendre davantage quand même je pourrais me hisser jusque-là. Inconnu dans la chambre de bois de construction et les aliments indispensables à eux, ou de quelque ', '2024-12-10 23:29:31', 37, 8, 'pending'),
(215, 'Beauté et qualités devaient mourir dans l\'arène, et l\'amour de moi. Pensée, rêverie, prière ; ce sont les infusoires qui l\'ont entrevue dans le couvent. Écrire des lettres ; mais leur trépas était une pure impossibilité ; je vis comme je l\'ai trouvé enfin', '2024-12-10 23:30:53', 37, 8, 'pending'),
(216, 'test', '2024-12-11 00:16:31', 36, 8, 'pending'),
(221, 'test 2', '2024-12-11 02:48:32', 36, 6, 'pending');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','read','resolved') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_id` int DEFAULT NULL,
  `article_id` int DEFAULT NULL,
  `undercategory_id` int DEFAULT NULL,
  `display_order` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `article_id` (`article_id`),
  KEY `undercategory_id` (`undercategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `url`, `description`, `created_at`, `category_id`, `article_id`, `undercategory_id`, `display_order`) VALUES
(20, '/assets/images/informatique.jpg', 'image illustrant l\'informatique en generale ', '2024-11-20 11:34:29', NULL, NULL, NULL, 1),
(21, 'assets/images/RV.webp', 'homme utilisant un casque de réalité virtuelle', '2024-11-20 12:40:09', NULL, NULL, NULL, 3),
(22, 'assets/images/Jeux.webp', 'deux manette de jeux video en arriere plan une tv l\'image illustre la catégorie Jeu video', '2024-11-20 15:49:22', NULL, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `undercategory`
--

DROP TABLE IF EXISTS `undercategory`;
CREATE TABLE IF NOT EXISTS `undercategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `undercategory_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `undercategory`
--

INSERT INTO `undercategory` (`id`, `category_id`, `undercategory_id`, `name`, `description`, `image_url`) VALUES
(4, 1, 4, 'Web', 'Tout ce qu’il faut savoir sur les dernières tendances et évolutions du web ! Découvrez des articles sur les nouvelles technologies de développement, les mises à jour de navigateurs, les tendances en matière de design et d\'UX, ainsi que les avancées en matière de sécurité et de protection de la vie privée en ligne.', '/public/assets/images/recherche-web.webp'),
(6, 2, 0, 'Meta oculus Quest', 'Plongez dans l’univers de la réalité virtuelle avec les casques Meta Oculus Quest ! Découvrez les dernières nouveautés en matière de VR, les mises à jour logicielles, les jeux les plus récents, et les applications immersives qui exploitent le plein potentiel de ces casques. Profitez d’articles qui explorent les améliorations matérielles, les innovations de Meta dans le domaine de la VR, et les perspectives d’évolution pour les amateurs de réalité virtuelle.', '/public/assets/images/RV.webp'),
(7, 1, 0, 'Software', 'Retrouvez les actualités sur les logiciels incontournables ! Ce type d’article couvre les dernières versions de vos outils préférés, les nouvelles applications à découvrir, les mises à jour majeures, et des analyses sur les solutions logicielles qui transforment le quotidien des particuliers et des professionnels.', '/public/assets/images/software.webp'),
(8, 1, 0, 'Hardware', 'Découvrez les nouveautés et innovations du monde du Hardware ! Ces articles abordent les composants de dernière génération, les avancées en matière de performances, les innovations en intelligence artificielle intégrée au matériel, et des tests de produits pour vous aider à mieux choisir vos équipements.', '/public/assets/images/Hardware.webp'),
(9, 2, 0, 'Apple vision pro', 'Restez informé des innovations d’Apple dans la réalité augmentée avec le casque Vision Pro. Retrouvez des articles sur les fonctionnalités révolutionnaires, les avancées technologiques et les premières impressions des utilisateurs. Explorez comment Apple intègre ses technologies AR dans ce casque de nouvelle génération, les applications conçues pour enrichir l\'expérience utilisateur, et les actualités autour de son impact potentiel dans le secteur.', '/public/assets/images/Apple-Vision-Pro.webp'),
(10, 3, 0, 'Console', 'Les consoles de jeux vidéo continuent de dominer l\'industrie, offrant des expériences de jeu immersives et des innovations constantes. Que ce soit avec les dernières exclusivités, des graphismes époustouflants ou des services en ligne révolutionnaires, elles séduisent les joueurs de tous horizons. Découvrez les nouveautés et actualités du monde des consoles vidéo.', '/public/assets/images/console_jeux.webp'),
(11, 3, 0, 'Gaming', 'Le gaming ne cesse de captiver les passionnés avec des innovations spectaculaires, des jeux aux graphismes époustouflants et des expériences multijoueurs immersives. Plongez dans cet univers fascinant pour découvrir les dernières tendances, nouveautés, et tout ce qui façonne l\'industrie du jeu vidéo.', '/public/assets/images/jeux_video.webp');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` char(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `pseudo`, `email`, `password`, `role`, `created_at`, `status`) VALUES
(36, 'toto', 'toto@hotmail.fr', '$2b$10$S2jH/kpiAJ0WmS69DOXf7.Pxat.vehN8puG0A4ZQXdRfGN3Y3Ztym', 'user', '2024-12-07 16:41:34', 1),
(37, 'nabylh', 'nabylh@hotmail.fr', '$2b$10$S3BDhD.50M6pGoWoy.nEMeLwnrq2jlmyenJQ0cq3icL20EvIzf5qu', 'admin', '2024-12-07 16:47:56', 1),
(44, 'tata', 'tata@hotmail.fr', '$2b$10$MldLFLpVALacDECvfsmEPeRmTtoALfM1peE8Bs9g6wiwQXY5G/h1S', 'user', '2024-12-10 19:22:30', 1),
(45, 'didir', 'didir@hotmail.fr', '$2b$10$Ezs52WSPfJOjHpnjgNNmJuwhHox5bw9CEmTtK0B5vIUoBmnp9cyji', 'user', '2024-12-11 02:05:39', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`underCategory_id`) REFERENCES `undercategory` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `image_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `image_ibfk_3` FOREIGN KEY (`article_id`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `image_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `image_ibfk_5` FOREIGN KEY (`undercategory_id`) REFERENCES `image` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
