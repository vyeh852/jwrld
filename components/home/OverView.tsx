import React, { Reducer, useReducer } from "react";
import Modal from "@/components/Modal";
import {
  Action,
  initialState,
  reducer,
  State,
  ActionType,
} from "@/reducers/ModalReducer";

/**
 * @return {JSX.Element}
 */
export default function OverView(): JSX.Element {
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
    dispatchModal({ type: ActionType.CloseModal });
  };

  return (
    <div>
      <p>overview</p>
      <button onClick={() => dispatchModal({ type: ActionType.CreateNote })}>
        建立筆記
      </button>
      <button
        onClick={() => dispatchModal({ type: ActionType.CreateCategory })}
      >
        建立分類
      </button>
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
    </div>
  );
}
