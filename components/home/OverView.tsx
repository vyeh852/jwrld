import React, { Reducer, useReducer, useState } from "react";
import Modal from "@/components/Modal";
import {
  Action,
  initialState,
  reducer,
  State,
  ActionType,
} from "@/reducers/ModalReducer";
import { getCategoryWithNote } from "@/actions/fetchActions";
import { Category } from "@/domain/models/category";
import CategoryNotesContainer from "@/components/home/CategoryNotesContainer";
import SettingsPanel from "@/components/home/SettingsPanel";
import { styled } from "@linaria/react";

const OverviewContainer = styled.div`
  display: flex;
`;

/**
 * @return {JSX.Element}
 */
export default function OverView({
  categories,
}: {
  categories: Category[];
}): JSX.Element {
  const [categoriesState, setCategoriesState] = useState(categories);
  const [modal, dispatchModal] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState
  );
  const { title, show, onConfirmCallback, content } = modal;

  const onConfirm = async () => {
    if (!onConfirmCallback || !content) {
      return;
    }

    await onConfirmCallback({ title: content });
    const categories = await getCategoryWithNote();
    setCategoriesState(categories);
    dispatchModal({ type: ActionType.CloseModal });
  };

  return (
    <OverviewContainer>
      <SettingsPanel
        onCreateCategory={() =>
          dispatchModal({ type: ActionType.CreateCategory })
        }
        onCreateNote={() => dispatchModal({ type: ActionType.CreateNote })}
      />
      <CategoryNotesContainer categories={categoriesState} />
      <Modal
        title={title}
        show={show}
        onConfirm={onConfirm}
        onClose={() => dispatchModal({ type: ActionType.CloseModal })}
      >
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatchModal({
              type: ActionType.EditContent,
              payload: e.target.value,
            })
          }
        />
      </Modal>
    </OverviewContainer>
  );
}
