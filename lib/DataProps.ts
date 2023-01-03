import { Database } from "./database.types";

type Reviews = Database["public"]["Tables"]["reviews"]["Row"];
type UpdateTags = Database["public"]["Tables"]["update_tags"]["Row"];
type Updates = Database["public"]["Tables"]["updates"]["Row"];
type Gallery = Database["public"]["Tables"]["gallery"]["Row"];

export interface DataProps {
  updateData: Updates[] | [];
  updateTags: UpdateTags[] | [];
  reviewData: Reviews[] | [];
  galleryData: Gallery[] | [];
}