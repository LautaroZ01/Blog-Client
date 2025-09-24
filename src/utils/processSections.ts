// utils/processSections.ts
import { PostFormType } from "@/types/postType";
import { uploadImageToCloudinary } from "./cloudinary";

export async function processSections(sections: PostFormType["sections"]) {
    return Promise.all(
        sections.map(async (section) => {
            if (section.thumbnail && section.thumbnail instanceof File) {
                const url = await uploadImageToCloudinary(section.thumbnail);
                return { ...section, thumbnail: url };
            }
            return section;
        })
    );
}
