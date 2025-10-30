import { signUpRequest, type SignUpRequest } from '@/6-shared/api';
import { useMutation } from '@tanstack/react-query';

export const useSignUpApi = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (params: SignUpRequest) => signUpRequest(params),
    });

    return { mutateAsync, isPending };
};
