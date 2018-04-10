<?php

	require 'config.php';

	function getInfoPhoto($Id){
		$stmt = $GLOBALS['db']->prepare('SELECT id, nom, mime, id_dossier FROM ' . $GLOBALS['schema'] . '.photos WHERE id = ?');
		$stmt->execute([$Id]);
		return $stmt->fetch(PDO::FETCH_ASSOC);
	}
	
	function getLabelTag($Id){
		$tag = [];
		$stmt = $GLOBALS['db']->prepare('SELECT label FROM ' . $GLOBALS['schema'] . '.tags WHERE id = ?');
		$stmt->execute([$Id]);
        $res = $stmt->fetch();
        $tag['label'] = $res['label'];
        $tag['id'] =$Id;
		return $tag;
	}
	
	function getTagsPhoto($Id){
		$tag = [];
		$stmt = $GLOBALS['db']->prepare('SELECT id_tag FROM ' . $GLOBALS['schema'] . '.photos_tags WHERE id_photo = ?');
		$stmt->execute([$Id]);
		$res = $stmt->fetchAll();
		foreach ($res as $row) {
		    $tag[] = getLabelTag($row['id_tag']);
        }
        return $tag;
	}
	
	function getExifPhoto($Id){
        $idDoss = getInfoPhoto($Id)['id_dossier'];
        $mime = getInfoPhoto($Id)['mime'];
        $exif = exif_read_data("../upload/$idDoss/$Id.$mime","COMPUTED");
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
