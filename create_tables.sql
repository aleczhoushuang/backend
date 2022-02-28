CREATE TABLE IF NOT EXISTS `event` (
  id int(11) NOT NULL,
  username varchar(255)  NOT NULL,
  admin BOOLEAN DEFAULT false,
  age int(11),
  telephone int(10),
  genre varchar(255),
  custom varchar(255),
  temps_shot int(11) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `game` (
  id int(11) PRIMARY KEY NOT NULL,
  username varchar(255)  NOT NULL,
  admin BOOLEAN DEFAULT false,
  temps_jeu int(11) NOT NULL,
  date_go varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `shotgun` (
  id int(11) PRIMARY KEY NOT NULL,
  nom_shotgun varchar(255)  NOT NULL,
  date_shotgun varchar(255) NOT NULL,
  nb_place int(11) NOT NULL,
  photo_shotgun varchar(255),
  email BOOLEAN DEFAULT false,
  age BOOLEAN DEFAULT false,
  telephone BOOLEAN DEFAULT false,
  genre BOOLEAN DEFAULT false,
  custom BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user` (
  username varchar(255)  NOT NULL,
  password varchar(255)  NOT NULL,
  fullname varchar(255) NOT NULL,
  photo varchar(255),
  bio varchar(255),
  age int(11),
  telephone int(10),
  genre varchar(255),
  lieu varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


