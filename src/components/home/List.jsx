import { Title } from "../Title";
import { Input } from "../Input";
import Button from "../Button";
import Loading from "../Loading";
import { useTaskData } from "../../hooks/Home/List/useTaskData";
import { useTaskActions } from "../../hooks/Home/List/useTaskActions";
import { useEditTaskState } from "../../hooks/Home/List/useEditTaskState";

export const List = ({ userId }) => {
  const { todo, completed, loading } = useTaskData(userId);
  const { completeTask, deleteTodo, deleteCompleted, editTodo } = useTaskActions(userId);
  const {
    editTask,
    setEditTask,
    editIndex,
    isEditing,
    startEdit,
    resetEdit,
  } = useEditTaskState();

  return (
    <div className="tw-w-[100%] tw-h-[75dvh]">
      <div className="tw-bg-transparent tw-border-2 tw-border-slate-600 tw-mx-auto tw-rounded-lg tw-p-5 tw-h-[100%] tw-no-scrollbar tw-overflow-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
            {todo.length > 0 && (
              <div>
                <div className="tw-flex tw-justify-center">
                  <Title
                    className="tw-text-myYellow tw-text-3xl tw-font-bold"
                    title={"Todo"}
                  />
                </div>
                <ul>
                  {todo.map((todoTask, index) => (
                    <li
                      key={index}
                      className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-myYellow tw-rounded-xl tw-p-4"
                    >
                      {editIndex !== index ? (
                        <>
                          <input
                            className="tw-accent-myYellow"
                            type="checkbox"
                            checked={false}
                            disabled={isEditing && editIndex !== index}
                            onChange={() => completeTask(index, todoTask)}
                          />
                          <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                            {todoTask}
                          </h3>
                          <button
                            className={`tw-text-slate-500 tw-duration-200 ${
                              isEditing && editIndex !== index
                                ? "tw-line-through"
                                : "hover:tw-scale-110 hover:tw-text-myYellow hover:tw-underline"
                            }`}
                            onClick={() => startEdit(todoTask, index)}
                            disabled={isEditing && editIndex !== index}
                          >
                            Edit
                          </button>
                          <button
                            className={`tw-text-slate-500 tw-duration-200 ${
                              isEditing && editIndex !== index
                                ? "tw-line-through"
                                : "hover:tw-scale-110 hover:tw-text-red-600 hover:tw-underline"
                            }`}
                            onClick={() => deleteTodo(index)}
                            disabled={isEditing && editIndex !== index}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <div className="tw-w-full">
                          <Title
                            className="tw-text-myYellow tw-text-lg"
                            title={"Edit Task"}
                          />
                          <Input
                            className="tw-w-[80%] tw-text-slate-200 tw-bg-transparent tw-border tw-border-slate-600 tw-p-2 tw-rounded-xl tw-my-2 tw-outline-none tw-rounded-r-none"
                            type="text"
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                          />
                          <Button
                            className="tw-w-[20%] tw-bg-transparent tw-text-myYellow tw-border tw-border-slate-600 tw-rounded-2xl tw-py-2 hover:tw-underline tw-duration-500 tw-rounded-l-none"
                            text="Submit"
                            onClick={() => {
                              editTodo(index, editTask);
                              resetEdit();
                            }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                <hr className="tw-border tw-w-[50%] tw-border-slate-600 tw-my-5 tw-mx-auto" />
              </div>
            )}

            {completed.length > 0 && (
              <div>
                <div className="tw-flex tw-justify-center">
                  <Title
                    className="tw-text-myYellow tw-text-3xl tw-font-bold"
                    title="Done"
                  />
                </div>
                <ul>
                  {completed.map((todoTask, index) => (
                    <li
                      key={index}
                      className="tw-flex tw-justify-between tw-gap-x-3 tw-mt-3 tw-border tw-border-slate-400 tw-rounded-xl tw-p-4"
                    >
                      <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                        {todoTask}
                      </h3>
                      <button
                        className="tw-text-red-600 tw-font-semibold hover:tw-underline hover:tw-scale-110 tw-duration-200"
                        onClick={() => deleteCompleted(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
