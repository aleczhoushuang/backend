
CREATE TABLE IF NOT EXISTS user (
  id_user INT NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255)  NOT NULL,
  fullname varchar(255) NOT NULL,
  photo LONGTEXT,
  bio LONGTEXT,
  age int(11),
  telephone varchar(255),
  genre varchar(255),
  lieu varchar(255),
  UNIQUE(username),
  PRIMARY KEY(id_user,username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS shotgun (
  id_shotgun varchar(255),
  cle INT NOT NULL AUTO_INCREMENT,
  id_user INT NOT NULL,
  nom_shotgun varchar(255)  NOT NULL,
	date_shotgun varchar(255) NOT NULL,
	nb_place int(11) NOT NULL,
	photo_shotgun LONGTEXT,
	email BOOLEAN DEFAULT false,
	age BOOLEAN DEFAULT false,
	telephone BOOLEAN DEFAULT false,
	genre BOOLEAN DEFAULT false,
	custom BOOLEAN DEFAULT false,
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
	admin BOOLEAN DEFAULT false,
	age int(11),
	telephone varchar(255),
	genre varchar(255),
	custom varchar(255),
	temps_shot varchar(255),
  visible BOOLEAN DEFAULT true,

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
