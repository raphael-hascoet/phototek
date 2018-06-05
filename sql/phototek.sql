drop schema if exists phototek;
create schema phototek;

create table phototek.utilisateur (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nom varchar(50) not null,
        mdp varchar(50) not null
);

create table phototek.tags (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	label varchar(50) not null
);

create table phototek.dossier (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nom varchar(50) not null
);

create table phototek.photos (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom varchar(50) not null,
        mime varchar(50) not null,
	id_dossier int not null,
	foreign key (id_dossier) references phototek.dossier(id)
);

create table phototek.exif (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_photo int not null,
	label varchar(50) not null,
	valeur varchar(50) not null,
	foreign key (id_photo) references phototek.photos(id)
);

create table phototek.photos_tags (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_photo int not null,
        id_tag int not null,
        foreign key (id_photo) references phototek.photos(id),
        foreign key (id_tag) references phototek.tags(id)
);

create table phototek.albums (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        nom varchar(50) not null,
        date_creation date not null,
        date_modif date not null,
        description varchar(300),
	publique bool not null default 0 
);

create table phototek.photos_albums (
	id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_photo int not null,
        id_album int not null,
        foreign key (id_photo) references phototek.photos(id),
        foreign key (id_album) references phototek.albums(id)
);

commit;
