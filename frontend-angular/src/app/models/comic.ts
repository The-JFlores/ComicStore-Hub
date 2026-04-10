

// Defines the structure of a comic object used in the application
export interface Comic {
  // Unique identifier of the comic
  comicID: number;

  // Title of the comic
  title: string;

  // Author of the comic
  author: string;

  // Publisher of the comic
  publisher: string | null;

  // Genre identifier
  genreID: number | null;

  // Genre name from the joined genres table
  genreName: string | null;

  // Comic price
  price: string;

  // Comic description
  description: string | null;

  // Cover image file name
  cover_image: string | null;

  // Uploaded digital comic file path
  file_path: string | null;

  // Creation timestamp
  created_at: string;
}