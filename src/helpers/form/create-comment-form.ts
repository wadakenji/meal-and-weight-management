import { z } from 'zod';

const commentFormSchema = z.object({
  date: z.string().date(),
  receiverId: z.string(),
  comment: z.string(),
});

type ParsedCommentFormData = NonNullable<
  ReturnType<(typeof commentFormSchema)['safeParse']>['data']
>;

export const COMMENT_FORM_VALUE_NAMES = {
  DATE: 'date',
  RECEIVER_ID: 'receiver-id',
  COMMENT: 'comment',
} as const;

export const validateAndParseCommentFormData = (
  formData: FormData,
): ParsedCommentFormData | false => {
  const dateString = formData.get(COMMENT_FORM_VALUE_NAMES.DATE);
  const receiverId = formData.get(COMMENT_FORM_VALUE_NAMES.RECEIVER_ID);
  const comment = formData.get(COMMENT_FORM_VALUE_NAMES.COMMENT);

  const parseResult = commentFormSchema.safeParse({
    date: dateString,
    receiverId,
    comment,
  });

  if (parseResult.error) return false;
  return parseResult.data;
};

export const parsedCommentFormDataToComment = (
  userId: string,
  parsedFormData: ParsedCommentFormData,
): CommentToCreate => {
  const { date, comment, receiverId } = parsedFormData;
  return { date, receiverId, senderId: userId, comment };
};
