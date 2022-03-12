
CREATE TABLE IF NOT EXISTS user (
  id_user INT NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255)  NOT NULL,
  fullname varchar(255) NOT NULL,
  photo LONGTEXT,
  bio varchar(255),
  age int(11),
  telephone int(10),
  genre varchar(255),
  lieu varchar(255),
  UNIQUE(username),
  PRIMARY KEY(id_user,username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS shotgun (
  cle INT NOT NULL AUTO_INCREMENT,
  id_user INT NOT NULL,
  nom_shotgun varchar(255)  NOT NULL,
	date_shotgun varchar(255) NOT NULL,
	nb_place int(11) NOT NULL,
	photo_shotgun LONGTEXT,
	email int(1) DEFAULT 0,
	age int(1) DEFAULT 0,
	telephone int(1) DEFAULT 0,
	genre int(1) DEFAULT 0,
	custom int(1) DEFAULT 0,
  custom_text varchar(1000),
  username varchar(255),
  PRIMARY KEY(cle),
  INDEX (id_user),

  FOREIGN KEY (id_user)
    REFERENCES user(id_user)
    ON UPDATE CASCADE ON DELETE CASCADE
)   ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS game (
  id_game INT NOT NULL AUTO_INCREMENT,
  id_user INT NOT NULL,
  username varchar(255)  NOT NULL,
  admin BOOLEAN DEFAULT false,
  temps_jeu int(11) NOT NULL,
  date_go varchar(255) NOT NULL,
  PRIMARY KEY(id_game),
  INDEX (id_user),

  FOREIGN KEY (id_user)
    REFERENCES user(id_user)
    ON UPDATE CASCADE ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS event (
	id_event int NOT NULL AUTO_INCREMENT,
	id_user INT NOT NULL,
	cle int(6) NOT NULL,
	username varchar(255) NOT NULL,
	admin int(1) DEFAULT 0,
	age int(11),
	telephone int(10),
	genre varchar(255),
	custom varchar(255),
	temps_shot int(11),
  visible int(1) DEFAULT 1,

    PRIMARY KEY(id_event),
    INDEX (cle),
    INDEX (id_user),

    FOREIGN KEY (cle)
      REFERENCES shotgun(cle)
      ON UPDATE CASCADE ON DELETE CASCADE,
      
	FOREIGN KEY (id_user)
      REFERENCES user(id_user)
      ON UPDATE CASCADE ON DELETE CASCADE
      
)   ENGINE=INNODB;
