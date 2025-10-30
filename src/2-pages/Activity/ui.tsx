import { useUse } from '@/6-shared/lib/useUse';
import { Box, CircularProgress, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Activity, Suspense, useEffect, useState, type FC, type PropsWithChildren } from 'react';

export const ActivityPage: FC = () => {
    const [tab, setTba] = useState('one');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setTba(newValue);
    };

    console.log({ tab });

    return (
        <>
            <Typography align="center" variant="h3" sx={{ mb: 2 }}>
                Activity
            </Typography>
            <Tabs
                value={tab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
                variant="fullWidth"
                sx={{ mb: 4 }}
            >
                <Tab value="one" label="Обычный компонент" />
                <Tab value="two" label="Activity" />
            </Tabs>

            <Suspense fallback={<CircularProgress />}>
                {tab === 'one' && <div>laskdjflakjdf</div>}

                <Activity mode={tab === 'two' ? 'visible' : 'hidden'}>
                    <TabContent index={2} />
                </Activity>
            </Suspense>
        </>
    );
};

export const TabContent: FC<PropsWithChildren<{ index: number }>> = () => {
    const data = useUse('user', () => fetch('https://jsonplaceholder.typicode.com/users/1').then((r) => r.json()));

    const [value, setValue] = useState('');

    useEffect(() => {
        console.log('render');

        return () => console.log('unmount');
    }, []);

    return (
        <Box>
            <TextField
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="FIO"
                id="outlined-basic"
                label="FIO"
                variant="outlined"
            />
            <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </Box>
    );
};
