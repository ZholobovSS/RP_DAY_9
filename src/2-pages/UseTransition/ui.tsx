import { Box, TextField, Typography } from '@mui/material';
import { useState, useTransition, type FC } from 'react';

export const UseTransition: FC = () => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
    const [isPending, startTransition] = useTransition();

    const changeHandler: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setValue(e.target.value);

        startTransition(async () => {
            const newUsers: typeof users = [];

            for (let index = 0; index < 2e4; index++) {
                newUsers.push({
                    id: index,
                    name: `${value} + ${index}`,
                });
            }

            setUsers(newUsers);
        });
    };

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                UseTransition
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    value={value}
                    onChange={changeHandler}
                    placeholder="Prefix"
                    id="outlined-basic"
                    label="Prefix"
                    variant="outlined"
                />
            </Box>
            <Typography align="center" variant="h4" sx={{ mb: 2 }}>
                Users:
            </Typography>
            <Box sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                {isPending
                    ? 'Loading...'
                    : users.map(({ id, name }) => (
                          <div key={id}>
                              {id}. {name}
                          </div>
                      ))}
            </Box>
        </>
    );
};
