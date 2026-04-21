<?php

class Comic {

    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // GET
    public function getAllComics() {

        $sql = "
            SELECT 
                c.comicID,
                c.title,
                c.author,
                c.publisher,
                c.genreID,
                g.name AS genreName,
                c.price,
                c.description,
                c.cover_image,
                c.file_path,
                c.created_at
            FROM comics c
            LEFT JOIN genres g ON c.genreID = g.genreID
            ORDER BY c.comicID DESC
        ";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // CREATE
    public function createComic($data) {

        $sql = "
            INSERT INTO comics (
                title,
                author,
                publisher,
                genreID,
                price,
                description,
                cover_image,
                file_path
            ) VALUES (
                :title,
                :author,
                :publisher,
                :genreID,
                :price,
                :description,
                :cover_image,
                :file_path
            )
        ";

        $stmt = $this->conn->prepare($sql);

        return $stmt->execute([
            ":title" => $data->title ?? null,
            ":author" => $data->author ?? null,
            ":publisher" => $data->publisher ?? null,
            ":genreID" => $data->genreID ?? null,
            ":price" => $data->price ?? 0,
            ":description" => $data->description ?? null,
            ":cover_image" => $data->cover_image ?? null,
            ":file_path" => $data->file_path ?? null
        ]);
    }

    // Delete
    public function deleteComic($id) {

    $sql = "DELETE FROM comics WHERE comicID = :id";

    $stmt = $this->conn->prepare($sql);

    return $stmt->execute([
        ":id" => $id
    ]);
  }
}