import { createCategory, createNote, deleteNote } from "@/actions/fetchActions";
import { Note } from "@/domain/models/note";
import { Reducer } from "react";

export enum ActionType {
  CreateNote = "createNote",
  UpdateNote = "updateNote",
  CreateCategory = "createCategory",
  UpdateCategory = "updateCategory",
  CloseModal = "closeModal",
  EditContent = "editContent",
  DeleteNote = "deleteNote",
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
    }
  | {
      type: ActionType.DeleteNote;
      payload: Pick<Note, "id" | "title">;
    };

export type State = {
  show: boolean;
  title: string;
  content: string;
  noteId: number;
  showInput: boolean;
  onConfirmCallback?: (params: any) => Promise<void>;
};

export const initialState: State = {
  show: false,
  title: "",
  noteId: 0,
  showInput: false,
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
        title: "輸入筆記名稱",
        show: true,
        showInput: true,
      };
    case ActionType.CreateCategory:
      return {
        ...state,
        onConfirmCallback: createCategory,
        title: "輸入類別名稱",
        show: true,
        showInput: true,
      };
    case ActionType.DeleteNote:
      return {
        ...state,
        onConfirmCallback: deleteNote,
        noteId: action.payload.id,
        title: `確定要刪除${action.payload.title}嗎?`,
        showInput: false,
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
