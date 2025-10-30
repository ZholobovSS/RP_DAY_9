import { wait } from '@/6-shared/lib/wait';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useOptimistic, useState, useTransition, type FC } from 'react';

type User = { id: number; name: string };
type OptimisticUser = User & {
    isOptimistic?: boolean;
};

export const UseOptimistic: FC = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            name: 'First',
        },
        {
            id: 2,
            name: 'Second',
        },
    ]);

    const [isPending, startTransition] = useTransition();

    const [optimisticState, addOptimistic] = useOptimistic<OptimisticUser[], OptimisticUser>(
        users,
        (state, newValue: OptimisticUser) => {
            console.log({ state });

            return [...state, newValue];
        },
    );

    console.log({ optimisticState, users, isPending });

    const changeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value);
    };

    const clickHandler = () => {
        const newUser = {
            id: Date.now(),
            name: value,
        };

        startTransition(async () => {
            addOptimistic({ ...newUser, isOptimistic: true });
            await wait(2e3);

            startTransition(() => {
                setUsers((prev) => {
                    console.log({ prev });
                    return [...prev, newUser];
                });
            });
        });
    };

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                useOptimistic
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    sx={{ mx: 1 }}
                    value={value}
                    onChange={changeHandler}
                    placeholder="Prefix"
                    id="outlined-basic"
                    label="Prefix"
                    variant="outlined"
                />

                <Button onClick={clickHandler} variant="contained">
                    Add
                </Button>
            </Box>
            <Typography align="center" variant="h4" sx={{ mb: 2 }}>
                Users:
            </Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                {optimisticState.map(({ id, name, isOptimistic }) => (
                    <Box key={id} sx={{ opacity: isOptimistic ? 0.5 : 1 }}>
                        {id}. {name}
                    </Box>
                ))}
            </Box>
        </>
    );
};
