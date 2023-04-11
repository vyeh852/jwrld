import { Category } from "@/domain/models/category";
import _ from "lodash";

export const sortCategories = (
  from: { categoryId: number | null; index: number },
  to: { categoryId: number | null; index: number },
  categories: Category[]
): Category[] => {
  const { categoryId: fromCategoryId, index: fromIndex } = from;
  const { categoryId: toCategoryId, index: toIndex } = to;
  const clonedCategories = _.cloneDeep(categories);
  const fromCategory = clonedCategories.find(
    (category) => category.id === fromCategoryId
  );
  const toCategory = clonedCategories.find(
    (category) => category.id === toCategoryId
  );
  if (fromCategory && toCategory) {
    const fromNote = fromCategory.notes[fromIndex];

    if (fromCategoryId === toCategoryId && fromIndex < toIndex) {
      toCategory.notes.splice(toIndex + 1, 0, fromNote);
      fromCategory.notes.splice(fromIndex, 1);
    } else {
      fromCategory.notes.splice(fromIndex, 1);
      toCategory.notes.splice(toIndex, 0, fromNote);
    }

    return clonedCategories;
  }

  return categories;
};
