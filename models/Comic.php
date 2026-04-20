
<?php

class Comic {

    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

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
}