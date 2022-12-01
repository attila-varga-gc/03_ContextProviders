import { renderHook, act } from "@testing-library/react-hooks";
import {
  CommentModel,
  CommentsModel,
} from "../../../model/comments/CommentsModel";
import { useCommentsViewModel } from "../useCommentsViewModel";

const comment: CommentModel = {
  id: 42,
  likes: 42,
  message: "42",
};

it("should convert the comment into UI presentable parts", async () => {
  const model = Mocked<CommentsModel>({
    comments: [comment],
  });
  const { result } = renderHook(() => useCommentsViewModel(model));
  expect(result.current.comments[0]).toMatchInlineSnapshot(`
    Object {
      "id": 42,
      "likes": "42 likes",
      "message": "42",
    }
  `);
});

it("should add a single like to the right comment", async () => {
  const model = Mocked<CommentsModel>({
    comments: [comment],
    addLike: jest.fn(),
  });
  const { result } = renderHook(() => useCommentsViewModel(model));
  act(() => result.current.like(result.current.comments[0]));
  expect(model.addLike).toBeCalledTimes(1);
  expect(model.addLike).toBeCalledWith(comment.id);
});
