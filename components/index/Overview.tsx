import React, { Reducer, useReducer, useState } from "react";
import Modal from "@/components/Modal";
import {
  Action,
  initialState,
  reducer,
  State,
  ActionType,
} from "@/reducers/ModalReducer";
import { getCategories } from "@/actions/fetchActions";
import { Category as DomainCategory } from "@/domain/models/category";
import { Category } from "@/components/index/Category";
import SettingsPanel from "@/components/index/SettingsPanel";
import { styled } from "@linaria/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import _ from "lodash";
import { sortCategories } from "@/utils/sortCategories";

const OverviewContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  &&& {
    height: calc(100vh - 50px);
    overflow: auto;
    padding: 15px;
    flex: 1;
    > div {
      margin-bottom: 15px;
    }
    @media (min-width: 768px) {
      display: flex;
      flex-wrap: wrap;
      .category-title {
        padding: 0 15px;
      }
    }

    .category-title {
      margin-bottom: 15px;
      font-size: 20px;
      font-weight: 700;
      background: #fff;
    }
  }
`;

/**
 * @return {JSX.Element}
 */
export default function OverView({
  categories: initialCategories,
}: {
  categories: DomainCategory[];
}): JSX.Element {
  const [categories, setCategories] = useState(initialCategories);
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
    const categories = await getCategories();
    setCategories(categories);
    dispatchModal({ type: ActionType.CloseModal });
  };

  const onMoveNote = (
    from: { categoryId: number | null; index: number },
    to: { categoryId: number | null; index: number }
  ) => {
    const sortedCategories = sortCategories(from, to, categories);
    setCategories(sortedCategories);
  };

  return (
    <OverviewContainer>
      <SettingsPanel
        onCreateCategory={() =>
          dispatchModal({ type: ActionType.CreateCategory })
        }
        onCreateNote={() => dispatchModal({ type: ActionType.CreateNote })}
      />
      <DndProvider backend={HTML5Backend}>
        <Container>
          {categories.map((category) => (
            <Category
              onMoveNote={onMoveNote}
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
      </DndProvider>
      <Modal
        title={title}
        show={show}
        onConfirm={onConfirm}
        onClose={() => dispatchModal({ type: ActionType.CloseModal })}
      >
        {showInput && (
          <input
            type="text"
            value={content}
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
