import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLike, setLikes } from "../pages/api/firebase";
import { useAuthContext } from "@/pages/_app";

export default function useMyBox() {
  const { uid } = useAuthContext();

  const queryClient = useQueryClient();
  const myBoxQuery = useQuery(["Likes", uid || ""], () => getLike(uid), {
    enabled: !!uid,
  });

  const addLike = useMutation((likeText) => setLikes(likeText, uid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["Likes", uid]);
    },
  });

  return { myBoxQuery, addLike };
}
