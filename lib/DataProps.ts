import { Database } from "./database.types";

type Reviews = Database["public"]["Tables"]["reviews"]["Row"];
type Updates = Database["public"]["Tables"]["updates"]["Row"];
type Gallery = Database["public"]["Tables"]["gallery"]["Row"];

export interface DataProps {
  updateData: Updates[] | [];
  reviewData: Reviews[] | [];
  galleryData: Gallery[] | [];
}