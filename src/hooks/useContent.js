import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAIProcess } from "@/pages/_app";
export default function useMyBox() {
  const { setContent } = useAIProcess();

  const queryClient = useQueryClient();
  const contentQuery = useQuery(["content"], () => uid, {
    enabled: !!uid,
  });

  const addQuestion = useMutation((content) => setContent(content), {
    onSuccess: () => {
      queryClient.invalidateQueries(["content"]);
    },
  });

  return { contentQuery, addQuestion };
}
