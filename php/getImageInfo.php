<?php

	require 'config.php';

	function getInfoPhoto($Id){
		$stmt = $GLOBALS['db']->prepare('SELECT id, nom, mime, id_dossier FROM ' . $GLOBALS['schema'] . '.photos WHERE id = ?');
		$stmt->execute([$Id]);
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
	
	function getLabelTag($Id){
		$label = [];
		$stmt = $GLOBALS['db']->query('SELECT label FROM ' . $GLOBALS['schema'] . '.tags WHERE id = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$label.append($donnee);
		}
		return $label;
	}
	
	function getTagsPhoto($Id){
		$Tag = [];
		$stmt = $GLOBALS['db']->query('SELECT id_tag FROM ' . $GLOBALS['schema'] . '.photos_tags WHERE id_photo = ?');
		$stmt->execute([$Id]);
		$Tag.getLabel($GLOBALS['db'], $stmt);
		return $Tag;
	}
	
	function getExifPhoto($Id){
		$exif = [];
		$stmt = $GLOBALS['db']->prepare('SELECT taille, date_dern, date, resolution, qualite, format, auteur, appareil, coordonnee FROM ' . $GLOBALS['schema'] . '.exif WHERE id_photo = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$exif.append($donnee);
		}
		return $exif;
	}
	
	/*
	function getPersonnePhoto($GLOBALS['db'], $Id){
	* $pers = [];
		$stmt = $GLOBALS['db']->query('SELECT personne ??? WHERE id_photo = ?');
		$stmt->execute([$Id]);
		foreach($stmt as $donnee){
			$pers.append($donnee);
		}
		return $pers;
	}
	*/
	
	function getAllPhoto($Id){
		$all = [];
		$all.append(getInfoPhoto($GLOBALS['db'], $Id));
		$all.append(getTagsPhoto($GLOBALS['db'], $Id));
		$all.append(getExifPhoto($GLOBALS['db'], $Id));
		return $all;
	 }
	
	
?>
