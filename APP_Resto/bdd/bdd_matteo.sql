-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 05 déc. 2024 à 17:18
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `matteo`
--

-- --------------------------------------------------------

--
-- Structure de la table `app_action`
--

CREATE TABLE `app_action` (
  `id_action` int(11) NOT NULL,
  `label` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_action`
--

INSERT INTO `app_action` (`id_action`, `label`) VALUES
(1, 'Voir la carte'),
(2, 'Modifier les évènements'),
(3, 'Supprimer un évènement'),
(4, 'Créer un évènement'),
(5, 'S\'inscire a un évènement'),
(6, 'Valider les demandes en cours'),
(7, 'Modification du mot de passe'),
(8, 'Modification du pseudo');

-- --------------------------------------------------------

--
-- Structure de la table `app_evenement`
--

CREATE TABLE `app_evenement` (
  `id_event` int(11) NOT NULL,
  `label_event` varchar(75) NOT NULL,
  `nbBenevoleRequis` int(11) DEFAULT NULL,
  `nb_repas_prevu` int(11) NOT NULL,
  `latitude_event` varchar(200) NOT NULL,
  `cp_event` varchar(10) NOT NULL,
  `ville_event` varchar(50) NOT NULL,
  `rue_event` varchar(40) NOT NULL,
  `date_event` date NOT NULL,
  `heure_debut_event` time NOT NULL,
  `heure_fin_event` time NOT NULL,
  `commentaire` varchar(250) DEFAULT NULL,
  `date_annulation` datetime DEFAULT NULL,
  `id_util` int(11) NOT NULL,
  `longitude_event` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_evenement`
--

INSERT INTO `app_evenement` (`id_event`, `label_event`, `nbBenevoleRequis`, `nb_repas_prevu`, `latitude_event`, `cp_event`, `ville_event`, `rue_event`, `date_event`, `heure_debut_event`, `heure_fin_event`, `commentaire`, `date_annulation`, `id_util`, `longitude_event`) VALUES
(1, 'Distribution de repas Paris', 5, 200, '55.2', '75001', 'Paris', 'Rue de Rivoli', '2024-11-30', '12:00:00', '14:00:00', 'Distribution de repas aux sans-abris sur la place devant la mairie.', '2025-01-15 00:00:00', 2, '2.3522'),
(2, 'Donation de repas à Lyon', 4, 0, '45.7640', '69001', 'Lyon', 'Rue de la République', '2025-02-25', '09:00:00', '12:00:00', 'Organisation d’une collecte de vêtements pour les personnes en difficulté.', '2025-02-26 00:00:00', 3, '4.8357'),
(3, 'Repas de Noël Marseille', 8, 150, '43.2965', '13001', 'Marseille', 'La Canebière', '2024-12-24', '19:00:00', '22:00:00', 'Dîner spécial de Noël pour les familles et les enfants dans le besoin.', NULL, 1, '5.3698'),
(4, 'Soupe populaire Lille', 3, 100, '48.52', '59000', 'Lille', 'Place du Général de Gaulle', '2025-03-28', '18:00:00', '20:00:00', 'Distribution de soupes et boissons chaudes pour les personnes sans domicile fixe.', '2025-02-05 00:00:00', 4, '3.0573'),
(5, 'Donation alimentaire Bergerac', 6, 0, '44.8378', '24520 ', 'Cours-de-Pile', '2605 Route de Saint-Germain', '2025-01-05', '10:00:00', '13:00:00', 'Collecte de denrées alimentaires pour le centre des Restos du Cœur.', '2025-01-20 00:00:00', 5, '0.5792'),
(6, 'Petit-déjeuner solidaire Nantes', 2, 80, '47.21419906616211', '44000', 'Nantes', 'Place Royale', '2024-11-23', '08:00:00', '10:00:00', 'Offrir un petit-déjeuner solidaire pour les personnes sans-abri du centre-ville.', '2025-02-01 00:00:00', 6, '-1.55845046043396'),
(7, 'Solidaire à Strasbourg', 7, 0, '48.5734', '67000', 'Strasbourg', 'Place Kléber', '2025-04-05', '09:00:00', '17:00:00', 'Grande braderie solidaire pour récolter des fonds pour l’association.', '2025-01-10 00:00:00', 2, '7.7521'),
(8, 'Dîner social Montpellier', 4, 120, '43.6119', '34000', 'Montpellier', 'Place de la Comédie', '2025-05-18', '19:00:00', '21:00:00', 'Dîner organisé en plein air pour les personnes en situation précaire.', '2025-01-25 00:00:00', 3, '3.8772'),
(9, 'Solidaire à Toulouse', 5, 0, '43.6047', '31000', 'Toulouse', 'Place du Capitole', '2025-06-20', '08:00:00', '12:00:00', 'Course caritative pour sensibiliser et lever des fonds pour les sans-abris.', NULL, 4, '1.4442'),
(10, 'Dîner de charité', 10, 50, '48.8566', '75001', 'Paris', 'Rue de Rivoli', '2024-12-23', '19:00:00', '22:00:00', 'Événement pour la distribution de repas gratuits.', '2024-12-10 00:00:00', 1, '2.3522');

-- --------------------------------------------------------

--
-- Structure de la table `app_inscrire`
--

CREATE TABLE `app_inscrire` (
  `id_util` int(11) NOT NULL,
  `id_event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_inscrire`
--

INSERT INTO `app_inscrire` (`id_util`, `id_event`) VALUES
(2, 6),
(1, 1),
(110, 22);

-- --------------------------------------------------------

--
-- Structure de la table `app_permettre`
--

CREATE TABLE `app_permettre` (
  `id_action` int(11) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_permettre`
--

INSERT INTO `app_permettre` (`id_action`, `id_role`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3),
(5, 2),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(6, 3),
(7, 2),
(7, 3),
(7, 4),
(8, 2),
(8, 3),
(8, 4);

-- --------------------------------------------------------

--
-- Structure de la table `app_role`
--

CREATE TABLE `app_role` (
  `id_role` int(11) NOT NULL,
  `label_role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_role`
--

INSERT INTO `app_role` (`id_role`, `label_role`) VALUES
(1, 'SuperAdministrateur'),
(2, 'Administrateur'),
(3, 'Organisateur'),
(4, 'Bénévole');

-- --------------------------------------------------------

--
-- Structure de la table `app_statut`
--

CREATE TABLE `app_statut` (
  `id_statut` int(11) NOT NULL,
  `label` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_statut`
--

INSERT INTO `app_statut` (`id_statut`, `label`) VALUES
(1, 'En cours'),
(2, 'Accepté'),
(3, 'Refusé'),
(4, 'Bloqué');

-- --------------------------------------------------------

--
-- Structure de la table `app_utilisateurs`
--

CREATE TABLE `app_utilisateurs` (
  `id_util` int(11) NOT NULL,
  `pseudo_util` varchar(25) NOT NULL,
  `mdp_util` varchar(500) NOT NULL,
  `nom_util` varchar(30) NOT NULL,
  `prenom_util` varchar(30) NOT NULL,
  `tel_util` varchar(50) NOT NULL,
  `cp_util` varchar(25) NOT NULL,
  `ville_util` varchar(50) NOT NULL,
  `rue_util` varchar(150) NOT NULL,
  `date_naissance` date NOT NULL,
  `mail_util` varchar(100) NOT NULL,
  `message_motiv_util` varchar(500) NOT NULL,
  `date_derniere_connexion` datetime NOT NULL,
  `date_cree_util` datetime NOT NULL,
  `date_statuts` date DEFAULT NULL,
  `id_role` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL,
  `comment` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `app_utilisateurs`
--

INSERT INTO `app_utilisateurs` (`id_util`, `pseudo_util`, `mdp_util`, `nom_util`, `prenom_util`, `tel_util`, `cp_util`, `ville_util`, `rue_util`, `date_naissance`, `mail_util`, `message_motiv_util`, `date_derniere_connexion`, `date_cree_util`, `date_statuts`, `id_role`, `id_statut`, `comment`) VALUES
(1, 'superadmin', '$2b$10$chO9h/fvsX5NUm7JHL4i8.Lqr/xnFw0jRHQeMeXwd844HDX7qSAeW', 'Petrault', 'Mattéo', '0783653565', '79100', 'Thouars', 'Rue bel air', '2004-03-16', 'matteo.petraultpro@gmail.Com', 'Je suis le SuperAdmin', '2024-10-04 09:00:00', '2024-10-01 08:30:00', '2024-10-01', 1, 2, 'superadmin'),
(2, 'admin1', '$2b$10$P85eNskPx8gBL0xVc1MlaOj1kyheh1sribyTAKq2CAAKSISB0wOIq', 'Martin', 'Sophie', '0600000001', '69001', 'Lyon', 'Rue de la République', '1985-03-22', 'sophie.martin@restosducoeur.org', 'Je souhaite aider à coordonner les événements.', '2024-10-04 09:30:00', '2024-10-01 08:40:00', '2024-10-01', 2, 2, 'admin1'),
(3, 'admin2', '$2b$10$1sBh6bu2deE1lPdyDUT97.UtsouX1IAwXspWqf5FjBXZlustqvsxK', 'Durand', 'Pierre', '0600000002', '13001', 'Marseille', 'Boulevard National', '1990-06-10', 'pierre.durand@restosducoeur.org', 'Motivé par la cause des Menus du Cœur.', '2024-10-04 09:35:00', '2024-10-01 08:50:00', '2024-10-01', 2, 2, 'admin2'),
(4, 'admin3', '$2b$10$buvBJtezg8A3VVFE1vtaceQKuBriYDC5LD.JfTeXbVGRptTMWkf.u', 'Leroy', 'Camille', '0600000003', '33000', 'Bordeaux', 'Cours de l\'Intendance', '1988-12-05', 'camille.leroy@restosducoeur.org', 'Volontaire pour aider à la gestion des repas.', '2024-10-04 09:40:00', '2024-10-01 08:55:00', '2024-10-01', 2, 2, 'admin3'),
(5, 'admin4', '$2b$10$eOl1EqSEFQ5oyKZfj5Vmpu7BWclTXeo434QCN559yfKePFm9xIDuy', 'Bernard', 'Louis', '0600000004', '59000', 'Lille', 'Rue Faidherbe', '1995-08-19', 'louis.bernard@restosducoeur.org', 'Je souhaite m\'impliquer dans l\'organisation.', '2024-10-04 09:45:00', '2024-10-01 09:00:00', '2024-10-01', 2, 2, 'admin4'),
(6, 'admin5', '$2b$10$Qh.RAGRw.CC42FDjIobXheZUaJHISk8YeISItJXBzm7JXIHREmVvq', 'Moreau', 'Claire', '0600000005', '67000', 'Strasbourg', 'Avenue de la Liberté', '1992-11-30', 'claire.moreau@restosducoeur.org', 'Particulièrement intéressée par la logistique.', '2024-10-04 09:50:00', '2024-10-01 09:05:00', '2024-10-01', 2, 2, 'admin5'),
(7, 'mblanc', '$2b$10$ImYYsGrdHo4/SLA7NNDdCuoMVUTqBdrE5HWI0rl0P/FSu7Qd563CK', 'Blanc', 'Marc', '0600000006', '75001', 'Paris', 'Rue de Rivoli', '1990-04-15', 'marc.blanc@restosducoeur.org', 'Je veux aider à organiser des événements.', '2024-10-04 10:00:00', '2024-10-01 09:10:00', '2024-10-01', 3, 2, 'mblanc'),
(8, 'efournier', '$2b$10$QlTmHhwIUeWJg6bfkcNtvOHdHDCpwFY2rEna2yms6wzSPHplrOf1S', 'Fournier', 'Emma', '0600000007', '69002', 'Lyon', 'Quai Jules Courmont', '1985-06-22', 'emma.fournier@restosducoeur.org', 'Prête à organiser des événements de distribution.', '2024-10-04 10:05:00', '2024-10-01 09:15:00', '2024-10-01', 3, 2, 'efournier'),
(9, 'glucas', '$2b$10$5Kat3K7ZWtVuTYY5Y74d5OhxCEr8rcvxBej9Zgp.dHUdkpeGlhN0y', 'Girard', 'Lucas', '0600000008', '13001', 'Marseille', 'Rue Sainte', '1992-07-19', 'lucas.girard@restosducoeur.org', 'Organisateur dans le sud de la France.', '2024-10-04 10:10:00', '2024-10-01 09:20:00', '2024-10-01', 3, 2, 'glucas'),
(10, 'rmarie', '$2b$10$/7J6SL49pnvNioGv3JSSjeCPxPen0HmIoNz6xEaZdQX5yhlQKMnkK', 'Roux', 'Marie', '0600000009', '59000', 'Lille', 'Rue Royale', '1988-09-30', 'marie.roux@restosducoeur.org', 'Active sur le terrain pour organiser des événements.', '2024-10-04 10:15:00', '2024-10-01 09:25:00', '2024-10-01', 3, 2, 'rmarie'),
(11, 'mantoine', '$2b$10$cy4tRNqdd6SDQ9OIgGMABO6Q2f/h8Vp.LaL57f1/AP/8A/rMT2Y/2', 'Morel', 'Antoine', '0600000010', '33000', 'Bordeaux', 'Allée de Tourny', '1993-02-25', 'antoine.morel@restosducoeur.org', 'Expérimenté dans la gestion logistique.', '2024-10-04 10:20:00', '2024-10-01 09:30:00', '2024-10-01', 3, 2, 'mantoine'),
(12, 'gjulie', '$2b$10$Ux39CP5.qxcxVOzfMNFWoePxaTHZAY..xH/rYllU.RwupRRqIgO3u', 'Garnier', '', '0600000011', '67000', '', 'Avenue des Vosges', '1987-05-05', 'julie.garnier@restosducoeur.org', 'Très motivée à organiser des événements.', '2024-10-04 10:25:00', '2024-10-01 09:35:00', '2024-10-01', 3, 2, 'gjulie'),
(13, 'cthomas', '$2b$10$hUnLhdtFn0Siy4d/ZTfdyuYt3gUxztfPpLpqpp27uj0WrVIkiCmnS', 'Chevalier', 'Thomas', '0600000012', '31000', 'Toulouse', 'Place du Capitole', '1990-12-11', 'thomas.chevalier@restosducoeur.org', 'Je veux m\'impliquer dans l\'organisation.', '2024-10-04 10:30:00', '2024-10-01 09:40:00', '2024-10-01', 3, 2, 'cthomas'),
(14, 'nbernard', '$2b$10$wcY6XkxwB9KpwyA9/wxVUOe3wS8mScaT4SJ0dnMZklMx49eGLFTbq', 'Bernard', 'Nathalie', '0600000013', '75018', 'Paris', 'Rue Ordener', '1989-03-14', 'nathalie.bernard@restosducoeur.org', 'Motivée à organiser dans le nord.', '2024-10-04 10:35:00', '2024-10-01 09:45:00', '2024-10-01', 3, 2, 'nbernard'),
(15, 'scharles', '$2b$10$Nz9KW9NyCaXCRreA6J5u3ehY5sRx.LzIy1bs772whz7lJU.uABc02', 'Simon', 'Charles', '0600000014', '69005', 'Lyon', 'Rue de la Vieille', '1986-11-22', 'charles.simon@restosducoeur.org', 'Prêt à organiser de grands événements.', '2024-10-04 10:40:00', '2024-10-01 09:50:00', '2024-10-01', 3, 2, 'scharles'),
(16, 'llaura', '$2b$10$1wiJhd.AYABVdzy1kptVv.84mGXxMJyg6UgycTb.6dHdZdjPW1lTe', 'Leclerc', 'Laura', '0600000015', '13007', 'Marseille', 'Corniche Kennedy', '1991-01-10', 'laura.leclerc@restosducoeur.org', 'Active dans l\'organisation à Marseille.', '2024-10-04 10:45:00', '2024-10-01 09:55:00', '2024-10-01', 3, 2, 'llaura'),
(17, 'bbaptiste', '$2b$10$xplMoMOtOIkUGC5w8h4Rm.3r3zOeY5MJecwjC4WDUFBIFXpDdSuEe', 'Baptiste', 'Barnabé', '0600000046', '75001', 'Paris', 'Rue de la Paix', '1990-05-15', 'baptiste.barnabe@gmail.com', 'Je veux aider comme bénévole.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbaptiste'),
(18, 'bbasile', '$2b$10$4Ge.oYg6Fqf7RbTiuL0bdewbf8gjUo8Ge0.vvSBQ6DQKjk/NtBX3m', 'Basile', 'Bastien', '0600000047', '69001', 'Lyon', 'Avenue de la Liberté', '1988-06-22', 'bastien.basile@gmail.com', 'Prête à aider en tant que bénévole.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbasile'),
(19, 'bbeatrice', '$2b$10$OhBCHTsNgcoDypNzVOKQnegJaHqhxAR2tYDjRfHynmjtATruD6uIy', 'Béatrice', 'Bénédicte', '0600000048', '13001', 'Marseille', 'Boulevard du Jardin', '1992-07-19', 'benedicte.beatrice@gmail.com', 'Volontaire pour des actions locales.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbeatrice'),
(20, 'bbenjamin', '$2b$10$ZkagCKxzJB80PiKriDj4du4Q9zK3qhRlEUE1T/Q4E35jvX/toStfW', 'Benjamin', 'Benoît', '0600000049', '59000', 'Lille', 'Rue de la République', '1985-09-30', 'benoit.benjamin@gmail.com', 'Motivée à aider les personnes dans le besoin.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbenjamin'),
(21, 'bberangere', '$2b$10$crKFHgs7M75iSulebQnaKefc6Eig0vQs/rw9EmfhC.0arBruJGXOS', 'Bérangère', 'Bérenger', '0600000050', '33000', 'Bordeaux', 'Avenue de l\'Océan', '1993-02-25', 'berenger.berangere@gmail.com', 'Je souhaite apporter mon aide.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bberangere'),
(22, 'bberenice', '$2b$10$JIOojbpn4UmU/KIqVyMND.6BvN2guDJ11n3lbdnzqiOeij8aZKrQm', 'Bérénice', 'Bénédicte', '0600000051', '67000', 'Strasbourg', 'Rue des Fleurs', '1987-05-05', 'benedict.berenice@gmail.com', 'Engagée pour des actions bénévoles.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bberenice'),
(23, 'bbernadette', '$2b$10$XS.k3AJ/ED7qx4EnBNeRWORxgwPYjmDbaj5D.tPR0IXvt5ldxxs7u', 'Bernadette', 'Bernard', '0600000052', '31000', 'Toulouse', 'Rue de la Paix', '1990-12-11', 'bernard.bernardette@gmail.com', 'Volontaire pour aider sur le terrain.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbernadette'),
(24, 'bbertrand', '$2b$10$/w8UxoyusHrtYHL9ljvjV.MWLn424aHcRdP5lIrmlnG5B7vZllFiG', 'Bertrand', 'Blanche', '0600000053', '75018', 'Paris', 'Rue de Montmartre', '1989-03-14', 'blanche.bertrand@gmail.com', 'Je suis prête à m\'engager.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbertrand'),
(25, 'bblandine', '$2b$10$n5xQKeeyaPy6SILvnOHtHO/3exVNiP31RNPWQBrLs1O5iZifbj0cK', 'Blandine', 'Brice', '0600000054', '69005', 'Lyon', 'Rue de la Conquête', '1986-11-22', 'brice.blandine@gmail.com', 'Impliqué dans l\'organisation des événements.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bblandine'),
(26, 'bbrigitte', '$2b$10$6ZdPE/x4TFvI0j5XQg9gq.YTX2rAsCpdg4.7p28zkP2qn7mn2dC4e', 'Brigitte', 'Bruno', '0600000055', '13007', 'Marseille', 'Rue de l\'Hôtel de Ville', '1991-01-10', 'bruno.brigitte@gmail.com', 'Prête à aider sur le terrain.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'bbrigitte'),
(27, 'ddamien', '$2b$10$kxq46AkGOV2fjMRi3alYyubhXMZzuKQNHrYkQDJKwjzHIxcxGYJJ2', 'Damien', 'Danièle', '0600000056', '75010', 'Paris', 'Rue de Rivoli', '1984-03-22', 'damien.daniele@gmail.com', 'Je veux m\'engager en tant que bénévole.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'ddamien'),
(28, 'ddaphne', '$2b$10$Z493CnlDTWRA/5b16XESvuIlouwQsvOtANnJ5qwZoWN9JiOFKIApa', 'Daphné', 'David', '0600000057', '69008', 'Lyon', 'Avenue des Champs-Élysées', '1990-09-05', 'david.daphne@gmail.com', 'Disponible pour aider les plus démunis.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'ddaphne'),
(29, 'ddelphine', '$2b$10$1nxDbwL6mQ/Q9c.YUbaFUu99uoqcqSCMpIpSU/ggcp0XAq/QgfMv.', 'Delphine', 'Denis', '0600000058', '13002', 'Marseille', 'Rue de l\'Alma', '1989-08-19', 'denis.delphine@gmail.com', 'Je suis prête à donner de mon temps.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'ddelphine'),
(30, 'ddominique', '$2b$10$pbOthKpwGOladNq9bfG76uZm6samaQj6SaF9eLBi6jMmnmhAMoSAu', 'Dominique', 'Dorian', '0600000059', '33000', 'Bordeaux', 'Rue du Cours', '1983-06-01', 'dorian.dominique@gmail.com', 'Prêt à aider les personnes en difficulté.', '2024-10-04 11:13:38', '2024-10-04 11:13:38', '2024-10-04', 4, 2, 'ddominique'),
(31, 'eedmond', '$2b$10$IsPjJOor8iQEjdzG3AiYYezUCA2U6.T6GZOYv9hPJd6kgnhw8ENt2', 'Edmond', 'Edith', '0600000060', '75011', 'Paris', 'Rue du Faubourg Saint-Antoine', '1990-05-15', 'edmond.edith@gmail.com', 'Je veux m\'engager en tant que bénévole.', '2024-10-04 11:14:19', '2024-10-04 11:14:19', '2024-10-04', 4, 2, 'eedmond'),
(32, 'eeleonore', '$2b$10$MUVuWE6ZTFs7lbxVE1ysP.PmqCpTzZ5fKpWbJb.o4jVq04ujm.7U.', 'Eléonore', 'Elsa', '0600000061', '69007', 'Lyon', 'Boulevard du 11 Novembre', '1985-02-17', 'elsa.eleonore@gmail.com', 'Engagée à aider.', '2024-10-04 11:14:19', '2024-10-04 11:14:19', '2024-10-04', 4, 2, 'eeleonore'),
(33, 'mmaxime', '$2b$10$fSmb40gNfRXZsssaGMWNQuQ.KsKiXUBvRGcz6k/iqIKw61zgWqTn6', 'Maxime', 'Mélanie', '0600000062', '13004', 'Marseille', 'Avenue de l\'Opéra', '1988-08-22', 'melanie.maxime@gmail.com', 'Prête à donner de mon temps.', '2024-10-04 11:14:19', '2024-10-04 11:14:19', '2024-10-04', 4, 2, 'mmaxime'),
(34, 'rraphael', '$2b$10$OwMii0..6JEH2kbuTTBHx.xqVUQx7CNet.eDPKSGr1Y6QSgb1TC7e', 'Raphaël', 'Rachel', '0600000063', '31000', 'Toulouse', 'Rue de la Liberté', '1991-06-11', 'rachel.raphael@gmail.com', 'Motivée à contribuer.', '2024-10-04 11:14:19', '2024-10-04 11:14:19', '2024-10-04', 4, 2, 'rraphael'),
(35, 'vvictor', '$2b$10$nncDC81uyDkQd9FKbgEqYOx5it2vouoAuJglwm2IQFKP3/aoPCQ.u', 'Victor', 'Véronique', '0600000064', '75012', 'Paris', 'Rue de l\'Industrie', '1984-04-20', 'veronique.victor@gmail.com', 'Je souhaite faire une différence.', '2024-10-04 11:14:19', '2024-10-04 11:14:19', '2024-10-04', 4, 1, 'vvictor'),
(36, 'mpetrault', '$2b$10$qFnyrRqfLALYHpOrsJ8U2uy8uDXhxD2s2ebtA/AsQRjRnDZf7dtaW', 'petrault', 'matteo', '0783653565', '79100', 'thouars', '10 rue de bel air', '2004-03-16', 'matteo.petrault12@gmail.com', 'motiver', '2024-10-11 00:00:00', '2024-10-11 00:00:00', '2024-10-11', 3, 3, 'mpetrault'),
(37, 'mpetrault', 'test', ' petrault', 'prenom', '0783653565', '79100', 'thoiars', ' ggggg', '0000-00-00', ' matteo@test.Fr', 'tttttttt', '2024-11-26 10:56:13', '2024-11-26 10:56:13', NULL, 3, 1, NULL),
(38, 'johndoe', 'mypassword123', 'Doe', 'John', '0123456789', '75001', 'Paris', '10 Rue de Paris', '1990-01-01', 'johndoe@gmail.com', 'Je souhaite m\'inscrire comme bénévole pour l\'événement.', '2024-11-26 11:03:20', '2024-11-26 11:03:20', NULL, 3, 2, NULL),
(39, 'fffff', 'ffffff', 'ffffff', 'ffffff', '0456986596', '79300', 'fffff', 'ffffff', '2024-11-04', 'fffff@test.Fr', 'f', '2024-11-26 11:03:43', '2024-11-26 11:03:43', NULL, 3, 3, NULL),
(55, 'tets', '?', ' ?', '?', '?', ' ?', '?', '?', '0000-00-00', '?', ' ?', '2024-11-26 11:17:18', '2024-11-26 11:17:18', NULL, 3, 3, NULL),
(84, 'john_doe', 'hashed_password_example', 'Doe', 'John', '0123456789', '75001', 'Paris', '12 rue de la Paix', '1990-01-01', 'john.doe@gmail.com', 'Je souhaite m\'engager pour aider les autres.', '2024-11-26 11:35:31', '2024-11-26 11:35:31', NULL, 3, 1, NULL),
(88, 'alice_smith', 'encrypted_password_example', 'Smith', 'Alice', '0145789321', '69000', 'Lyon', '3 rue de la Liberté', '1985-05-15', 'alice.smith@example.com', 'Je veux participer à des événements pour aider les personnes dans le besoin.', '2024-11-26 11:36:50', '2024-11-26 11:36:50', NULL, 3, 1, NULL),
(90, 'alice_smith', 'encrypted_password_example', 'Smith', 'Alice', '0145789321', '69000', 'Lyon', '3 rue de la Liberté', '1985-05-15', 'alice.ith@example.com', 'Je veux participer à des événements pour aider les personnes dans le besoin.', '2024-11-26 11:41:05', '2024-11-26 11:41:05', NULL, 3, 1, NULL),
(92, 'tttt', 'xdswdefgfrefbgr', 'ttttt', 'ttttt', '0785264562', '79200', 'thouasr', '12 rue du test', '1991-11-26', 'als@tet.fr', 'EGeAFZafzAFa', '2024-11-26 11:46:38', '2024-11-26 11:46:38', NULL, 3, 1, NULL),
(94, 'tttt', 'xdswdefgfrefbgr', 'ttttt', 'ttttt', '0785264562', '79200', 'thouasr', '12 rue du test', '1991-11-27', 'alttts@tet.fr', 'EGeAFZafzAFa', '2024-11-26 11:53:16', '2024-11-26 11:53:16', NULL, 3, 1, NULL),
(95, 'tttt', 'xdswdefgfrefbgr', 'ttttt', 'ttttt', '0785264562', '79200', 'thouasr', '12 rue du test', '1991-11-27', 'altps@tet.fr', 'EGeAFZafzAFa', '2024-11-26 11:54:42', '2024-11-26 11:54:42', NULL, 3, 1, NULL),
(96, 'tttt', 'xdswdefgfrefbgr', 'ttttt', 'ttttt', '0785264562', '79200', 'thouasr', '12 rue du test', '1991-11-27', 'atettes@tet.fr', 'EGeAFZafzAFa', '2024-11-26 11:55:46', '2024-11-26 11:55:46', NULL, 3, 1, NULL),
(98, 'tttt', 'xdswdefgfrefbgr', 'ttttt', 'ttttt', '0785264562', '79200', 'thouasr', '12 rue du test', '1991-11-27', 'rttes@tet.fr', 'EGeAFZafzAFa', '2024-11-26 11:58:08', '2024-11-26 11:58:08', NULL, 3, 1, NULL),
(100, 'tttt', 'test', 'ttttt', 'ttttt', '0785264562', '79200', 'thouasr', '12 rue du test', '1991-11-27', 'tes@tet.fr', 'EGeAFZafzAFa', '2024-11-26 11:58:37', '2024-11-26 11:58:37', NULL, 3, 3, NULL),
(101, 'tt', 'tt', 'tt', 'tt', 'tt', 'tt', 'tt', 'tt', '2024-11-04', 'tt@gmail.Com', 'gggg', '2024-11-26 16:14:22', '2024-11-26 16:14:22', NULL, 3, 3, NULL),
(102, 'tt', 'tt', 'tt', 'tt', 'tt', 'tt', 'tt', 'tt', '2024-11-04', 'tt@test.lr', 'gggg', '2024-11-26 16:19:53', '2024-11-26 16:19:53', NULL, 3, 1, NULL),
(103, 'tttttcq', '$2b$10$oEaH.y0/k37o/UuinBkR8OVXkuWSFva7nXXZJ9IJmAqiESYfk1muO', 'tttt', 'ttt', 'ttt', 'tt', 'ttt', 'ttt', '2024-11-03', 'test@uuzihzi.fr', 'dddd', '2024-11-26 16:49:59', '2024-11-26 16:49:59', NULL, 4, 3, NULL),
(104, 'zz', 'zz', 'zz', 'zz', 'zz', 'zzz', 'z', 'zz', '2024-11-04', 'zz@zz.zz', 'zzzzz', '2024-11-26 16:50:23', '2024-11-26 16:50:23', NULL, 3, 3, NULL),
(105, 'ee', '$2b$10$yTPv72vVU1.p4aZ/1RFT/.nDUPmYCOMWQGq7QPlcD/2j7N4RvxH72', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', '2024-11-03', 'ee@ee.Ee', 'eeeee', '2024-11-26 16:53:31', '2024-11-26 16:53:31', NULL, 3, 1, NULL),
(106, 'aa', '$2b$10$Gj2z8xtvE5f3Hz4OSw3uYemWuDgSXwO4PGodNvI88uP/QdUMKW/CS', 'aaa', 'a', 'aa', 'a', 'a', 'a', '2024-11-25', 'aa@aa.fr', 'ffff', '2024-11-26 16:56:16', '2024-11-26 16:56:16', NULL, 4, 3, NULL),
(108, 'uu', '$2b$10$F/ak5PFI8FKNIt9s0TQNkekS/6LfZ6mVGqpzG6BMBHWO1F1hilAZa', 'uu', 'uu', 'uu', 'uu', 'uu', 'uu', '2024-11-24', 'poker.matteo12@gmail.com', 'je suis motiver ', '2024-11-26 17:09:24', '2024-11-26 17:09:24', NULL, 3, 3, NULL),
(109, 'ee', '$2b$10$yxhIFyAfSnsGRrM3K9pzoeKrdiFiqlLiKOUU4/2dH0ALHgE5M/H02', 'ee', 'ee', 'ee', 'ee', 'ee', 'ee', '2024-11-05', 'ee@mail.com', 'pp', '2024-11-28 16:52:15', '2024-11-28 16:52:15', NULL, 3, 2, NULL),
(110, 'ambriche', '$2b$10$okEZge0e5SpHIk12dgorbuMib.JED6d4TR6yGLd9RcsdDVZVbeA5e', 'ambriche', 'ambriche', '0785487484', '79100', 'tt', 'tt', '2003-01-16', 'dampure1601@gmail.com', 'tt', '2024-11-28 21:13:09', '2024-11-28 21:13:09', NULL, 3, 2, NULL),
(111, 'd', '$2b$10$taJr6pP2NqdUQJ1yfIOWaepWYitDJKdlp38ILlQ07Lo7t2PzoBkoO', 'd', 'd', 'd', 'd', 'd', 'd', '2001-11-11', 'jj@g.fr', 'ff', '2024-11-28 22:54:13', '2024-11-28 22:54:13', NULL, 4, 1, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `app_evenement`
--
ALTER TABLE `app_evenement`
  ADD PRIMARY KEY (`id_event`);

--
-- Index pour la table `app_utilisateurs`
--
ALTER TABLE `app_utilisateurs`
  ADD PRIMARY KEY (`id_util`),
  ADD UNIQUE KEY `mail_util` (`mail_util`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `app_evenement`
--
ALTER TABLE `app_evenement`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `app_utilisateurs`
--
ALTER TABLE `app_utilisateurs`
  MODIFY `id_util` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
