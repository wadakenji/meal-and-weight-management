'use client';

import { FC } from 'react';
import { useGetComments } from '@/app/(authenticated)/data-view/_hooks/use-get-comments/use-get-comments';
import { Modal } from '@/components/modal/modal';
import { format } from 'date-fns';
import { FormSubmitButton } from '@/components/control/button/form-submit-button/form-submit-button';
import { Textarea } from '@/components/control/textarea/textarea';
import { IconSpinner } from '@/components/icon/spinner';

type Props = {
  date: string;
  receiverId: string;
  receiverName: string | undefined;
  loggedInUserId: string;
  isOpen: boolean;
  close: () => void;
};

export const CommentModal: FC<Props> = ({
  date,
  receiverId,
  receiverName,
  loggedInUserId,
  isOpen,
  close,
}) => {
  const { comments, isLoading } = useGetComments(receiverId, date);
  const showsForm =
    loggedInUserId !== receiverId &&
    comments &&
    !comments.some(({ senderId }) => senderId === loggedInUserId);

  return (
    <Modal close={close} isOpen={isOpen}>
      <h2 className="mb-16px text-center text-xl font-bold">
        {receiverName ? `${receiverName}さんへの` : ''}メッセージ
      </h2>
      <div className="mb-16px">
        {!comments && isLoading && <IconSpinner />}
        {comments && comments.length === 0 && (
          <p className="text-center text-sm text-text-gray">
            メッセージはまだありません。
          </p>
        )}
        <ul>
          {comments &&
            comments.map((comment) => (
              <li
                key={comment.id}
                className="mb-8px border-b border-line p-8px"
              >
                <p className="mb-4px">{comment.comment}</p>
                <div className="flex justify-end gap-x-8px text-text-gray">
                  <span>{comment.senderId}</span>
                  <span>{format(comment.createdAt, 'M月d日 H:mm')}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {showsForm && (
        <form className="space-y-8px">
          <Textarea
            placeholder={
              (receiverName ? `${receiverName}さんに` : '') +
              '応援メッセージを書いて送ろう！'
            }
          />
          <FormSubmitButton>送る</FormSubmitButton>
        </form>
      )}
    </Modal>
  );
};
