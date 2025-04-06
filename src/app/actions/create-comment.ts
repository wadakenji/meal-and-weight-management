'use server';

import { getUser } from '@/usecase/user';
import { ERROR_MESSAGES } from '@/constants/error-message';
import {
  parsedCommentFormDataToComment,
  validateAndParseCommentFormData,
} from '@/helpers/form/create-comment-form';
import { createComment } from '@/usecase/comments/create-comment';

type CreateCommentActionState =
  | {
      createdComment?: never;
      error: string;
    }
  | {
      createdComment: CommentType;
      error?: never;
    }
  | null;

export const createCommentAction = async (
  _prevState: CreateCommentActionState,
  formData: FormData,
): Promise<CreateCommentActionState> => {
  const user = await getUser();
  if (!user) return { error: ERROR_MESSAGES.NOT_AUTHORIZED };

  const parseResult = validateAndParseCommentFormData(formData);
  if (!parseResult) return { error: ERROR_MESSAGES.INVALID_USER_INPUT };

  const commentToCreate = parsedCommentFormDataToComment(user.id, parseResult);

  const createdComment = await createComment(commentToCreate);

  return { createdComment };
};
