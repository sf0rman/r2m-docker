import { z } from "zod";
import { RequestHandler } from "express";
import {
  AlreadyExistsError,
  KnownInternalServerError,
  err,
} from "../middleware/errorHandler.js";
import { Collection, getClient } from "../repository/mongo.js";
import { createResponse } from "../middleware/response.js";
import { ObjectId } from "mongodb";

const CreateTodoDto = z.object({
  title: z.string().min(1).max(64),
  details: z.string().min(5),
});
type CreateTodoDto = z.infer<typeof CreateTodoDto>;

const UpdateTodoParams = z.object({
  id: z.string(),
});
type UpdateTodoParams = z.infer<typeof UpdateTodoParams>;

const TodoDto = CreateTodoDto.extend({
  complete: z.boolean().default(false),
  owner_id: z.string(),
  updated_at: z.date().optional(),
  created_at: z.date(),
});
type TodoDto = z.infer<typeof TodoDto>;

class TodoServiceError extends KnownInternalServerError {}
class TodoAlreadyExistsError extends AlreadyExistsError {}

const todoClient = getClient(Collection.TODO);

export const getTodos: RequestHandler<never, TodoDto[], never> = err(
  async (req, res, next) => {
    const userId = req.cookies["demo-session-cookie"];

    const todos = await todoClient.find({ owner_id: userId }).toArray();

    res.status(200).send(createResponse(todos));
  }
);

export const createTodo: RequestHandler<never, TodoDto, CreateTodoDto> = err(
  async (req, res, next) => {
    // we already know from auth handler that user exists
    const userId = req.cookies["demo-session-cookie"];
    const todo = CreateTodoDto.parse(req.body);

    const result = await todoClient.findOne({ title: todo.title });
    if (result) {
      throw new TodoAlreadyExistsError("Todo already exists", todo);
    }

    const fullTodo = TodoDto.safeParse({
      ...todo,
      complete: false,
      created_at: new Date(),
      owner_id: userId,
    });

    if (!fullTodo.success) {
      throw new TodoServiceError("Unable to create Todo item", todo);
    }

    await todoClient.insertOne(fullTodo.data);
    res.status(201).send(createResponse(fullTodo.data));
  }
);

export const updateTodo: RequestHandler<
  TodoDto,
  TodoDto,
  CreateTodoDto,
  UpdateTodoParams
> = err(async (req, res, next) => {
  const todoId = UpdateTodoParams.parse(req.params);
  const userId = req.cookies["demo-session-cookie"];
  const todo = CreateTodoDto.parse(req.body);

  const result = await todoClient.findOneAndUpdate(
    { _id: new ObjectId(todoId.id), owner_id: userId },
    { $set: { ...todo, updated_at: new Date() } }
  );
  console.log("RESULT", result);
  if (!result) {
    throw new TodoServiceError("Unable to update Todo item", {
      _id: todoId.id,
      ...todo,
    });
  }

  res.status(200).send(createResponse(result));
});
