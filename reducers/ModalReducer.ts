import { createCategory, createNote } from "@/actions/fetchActions";
import { Reducer } from "react";

export enum ActionType {
  CreateNote = "createNote",
  UpdateNote = "updateNote",
  CreateCategory = "createCategory",
  UpdateCategory = "updateCategory",
  CloseModal = "closeModal",
  EditContent = "editContent",
}

export type Action =
  | {
      type: ActionType.CreateNote;
    }
  | {
      type: ActionType.UpdateNote;
    }
  | {
      type: ActionType.CreateCategory;
    }
  | {
      type: ActionType.UpdateCategory;
    }
  | {
      type: ActionType.CloseModal;
    }
  | {
      type: ActionType.EditContent;
      payload: string;
    };

export type State = {
  show: boolean;
  title: string;
  content: string;
  onConfirmCallback?: (params: any) => Promise<void>;
};

export const initialState: State = {
  show: false,
  title: "",
  content: "",
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.CloseModal:
      return { ...state, show: false };
    case ActionType.EditContent:
      return { ...state, content: action.payload };
    case ActionType.CreateNote:
      return {
        ...state,
        onConfirmCallback: createNote,
        title: "創建筆記",
        show: true,
      };
    case ActionType.CreateCategory:
      return {
        ...state,
        onConfirmCallback: createCategory,
        title: "創建類別",
        show: true,
      };

    // TODO: update note / category
    // case ActionType.UpdateNote:
    //   return {
    //     ...state,
    //     title: "編輯筆記名稱",
    //     show: true,
    //   };
    // case ActionType.UpdateCategory:
    //   return {
    //     ...state,
    //     title: "編輯類別名稱",
    //     show: true,
    //   };
    default:
      throw new Error("undefined action type");
  }
};
