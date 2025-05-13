import { useEffect, useState } from "react";
import { Title } from "./Title";
import { Input } from "./Input";
import Button from "./Button";
// import { toast } from "react-toastify";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import Loading from "./Loading";

export const List = ({ userId }) => {
  const [editTask, setEditTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [todo, setTodo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isTaskedEdit, setIsTaskEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCompleteTodo = async (index, completedTask) => {
    const taskRef = doc(db, "tasks", userId);
    try {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(taskRef);
        if (!docSnap.exists()) {
          throw new console.error("Document does not exist!");
        }
        const data = docSnap.data();
        const currentTodo = data.todo || [];
        const currentCompleted = data.completed || [];

        const updatedTodo = currentTodo.filter((_, i) => i !== index);
        // const updatedCompleted = [...currentCompleted, completedTask];
        const updatedCompleted = [completedTask, ...currentCompleted];

        transaction.update(taskRef, {
          todo: updatedTodo,
          completed: updatedCompleted,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (index) => {
    const taskRef = doc(db, "tasks", userId);
    try {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(taskRef);
        if (!docSnap.exists()) {
          throw new console.error("Document does not exist!");
        }
        const data = docSnap.data();
        const currentTodo = data.todo || [];

        const updatedTodo = currentTodo.filter((_, i) => i !== index);

        transaction.update(taskRef, { todo: updatedTodo });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComplete = async (index) => {
    const taskRef = doc(db, "tasks", userId);
    try {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(taskRef);
        if (!docSnap.exists()) {
          throw new console.error("Document does not exist!");
        }
        const data = docSnap.data();
        const currentCompleted = data.completed || [];

        const updatedTodo = currentCompleted.filter((_, i) => i !== index);

        transaction.update(taskRef, { completed: updatedTodo });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTodo = async (index, editTask) => {
    const taskRef = doc(db, "tasks", userId);
    try {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(taskRef);
        if (!docSnap.exists()) {
          throw new console.error("Document does not exist!");
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "tasks", userId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTodo(data.todo || []);
        setCompleted(data.completed || []);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

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
                            className={`tw-accent-myYellow`}
                            type="checkbox"
                            checked={false}
                            disabled={isTaskedEdit && editIndex !== index}
                            onChange={() => handleCompleteTodo(index, todoTask)}
                          />
                          <h3 className="tw-text-left tw-flex-1 tw-text-wrap tw-text-slate-100">
                            {todoTask}
                          </h3>
                          <button
                            className={`tw-text-slate-500 tw-duration-200 ${
                              isTaskedEdit && editIndex !== index
                                ? "tw-line-through"
                                : "hover:tw-scale-110 hover:tw-text-myYellow hover:tw-underline"
                            }`}
                            onClick={() => {
                              setIsTaskEdit(true);
                              setEditTask(todoTask);
                              setEditIndex(index);
                            }}
                            disabled={isTaskedEdit && editIndex !== index}
                          >
                            Edit
                          </button>
                          <button
                            className={`tw-text-slate-500  tw-duration-200 ${
                              isTaskedEdit && editIndex !== index
                                ? "tw-line-through"
                                : "hover:tw-scale-110 hover:tw-text-red-600 hover:tw-underline"
                            }`}
                            onClick={() => {
                              handleDeleteTodo(index);
                            }}
                            disabled={isTaskedEdit && editIndex !== index}
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
                            type={"text"}
                            value={editTask}
                            onChange={(e) => {
                              setEditTask(e.target.value);
                            }}
                          />
                          <Button
                            className={
                              "tw-w-[20%] tw-bg-transparent tw-text-myYellow tw-border tw-border-slate-600 tw-rounded-2xl tw-py-2 hover:tw-underline tw-duration-500 tw-rounded-l-none"
                            }
                            text={"Submit"}
                            onClick={() => {
                              handleEditTodo(index, editTask);
                              setIsTaskEdit(false);
                              setEditIndex(-1);
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
                    title={"Done"}
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
                        onClick={() => handleDeleteComplete(index)}
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
