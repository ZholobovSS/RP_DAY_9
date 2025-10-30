import { TextField, Typography } from '@mui/material';
import { useEffect, useEffectEvent, useState, type FC } from 'react';

export const UseEffectEvent: FC = () => {
    const [value, setValue] = useState('');

    const cb = useEffectEvent((count: number) => console.log(`count: ${count}, value: ${value}`));

    useEffect(() => {
        let count = 0;

        const intervalId = setInterval(() => cb(count++), 1e3);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                useEffectEvent
            </Typography>

            <div>
                <TextField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="FIO"
                    id="outlined-basic"
                    label="FIO"
                    variant="outlined"
                />
            </div>
        </>
    );
};
