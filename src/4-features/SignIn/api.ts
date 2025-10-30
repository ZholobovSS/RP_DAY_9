import { signInRequest, type SignInRequest } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

export const useSignInApi = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (params: SignInRequest) => signInRequest(params),
    });

    return { mutateAsync, isPending };
};
