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
import { CategoryNote } from "@/components/home/CategoryNote";
import SettingsPanel from "@/components/home/SettingsPanel";
import { styled } from "@linaria/react";

const OverviewContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  padding: 15px;
  flex: 1;
  > div,
  .category-title {
    margin-bottom: 15px;
  }
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .category-title {
    font-size: 20px;
    font-weight: 700;
  }
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
  const { title, show, onConfirmCallback, content, noteId, showInput } = modal;

  const onConfirm = async () => {
    if (!onConfirmCallback) {
      return;
    }

    await onConfirmCallback({ title: content, id: noteId });
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
      <Container>
        {categoriesState.map((category) => (
          <CategoryNote
            category={category}
            key={category.id}
            onDeleteNote={({ id, title }) =>
              dispatchModal({
                type: ActionType.DeleteNote,
                payload: { id, title },
              })
            }
          />
        ))}
      </Container>
      <Modal
        title={title}
        show={show}
        onConfirm={onConfirm}
        onClose={() => dispatchModal({ type: ActionType.CloseModal })}
      >
        {showInput && (
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatchModal({
                type: ActionType.EditContent,
                payload: e.target.value,
              })
            }
          />
        )}
      </Modal>
    </OverviewContainer>
  );
}
