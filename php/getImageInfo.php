<?php
	function connectionBD(){
		try {
			$user = "info201701";
			$pass = "pj01an2017";
			$db = new PDO("mysql:dbname=p201701;host=129.20.239.194", $user, $pass);
		} catch (PDOException $e){
			$db = null;
			print ("Erreur !: " . $e->getMessage());
			die();
		}
		return $db;
	}
	
	$image = [];
	
	function getInfoPhoto($db, $Id){
		$info = [];
		$stmt = $db->prepare('SELECT nom, mime, id_dossier FROM p201701.photos WHERE id = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$info.append($donnee);
		}
		return $info;
	}
	
	function getLabelTag($db, $Id){
		$label = [];
		$stmt = $db->query('SELECT label FROM p201701.tags WHERE id = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$label.append($donnee);
		}
		return $label;
	}
	
	function getTagsPhoto($db, $Id){
		$Tag = [];
		$stmt = $db->query('SELECT id_tag p201701.photos_tags WHERE id_photo = ?');
		$stmt->execute([$Id]);
		$Tag.getLabel($db, $stmt);
		return $Tag;
	}
	
	function getExifPhoto($db, $Id){
		$exif = [];
		$stmt = $db->prepare('SELECT taille, date_dern, date, resolution, qualite, format, auteur, appareil, coordonnee FROM p201701.exif WHERE id_photo = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$exif.append($donnee);
		}
		return $exif;
	}
	
	/*
	function getPersonnePhoto($db, $Id){
	* $pers = [];
		$stmt = $db->query('SELECT personne ??? WHERE id_photo = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$pers.append($donnee);
		}
		return $pers;
	}
	*/
	
	function getAllPhoto($db, $Id){
		$all = [];
		$all.append(getInfoPhoto($db, $Id));
		$all.append(getTagsPhoto($db, $Id));
		$all.append(getExifPhoto($db, $Id));
		return $all;
	 }
	
	
?>
