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
	
	function getIdPhotosAll($db){
		$stmt = $db->query('SELECT id FROM p201701.photos');
		$idP = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
		return $idP;
	}
	
	function getIdDossiersAll($db){
		$stmt = $db->query('SELECT id FROM p201701.dossier');
		$idD = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
		return $idD;
	}
	
	function getIdAlbumsAll($db){
		$stmt = $db->query('SELECT id FROM p201701.albums');
		$idA = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
		return $idA;
	}
	
	function getIdTagsAll($db){
		$stmt = $db->query('SELECT id FROM p201701.tags');
		$idT = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
		return $idT;
	}
	
	function getIdPhotos_IdAlbum($db, $IdAlbum){
		$stmt = $db->query('SELECT id FROM p201701.photos_albums WHERE id_album = \'' . $IdAlbum . '\'');
		$idP = $stmt->fetchall(PDO::FETCH_COLUMN, 'id');
		return $idP;
	}
