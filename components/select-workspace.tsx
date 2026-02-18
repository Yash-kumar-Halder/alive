'use client';
import * as React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const SelectWorkspace = () => {
    const [alignItemWithTrigger, setAlignItemWithTrigger] = React.useState(true);
    return (
        <Select defaultValue="banana">
            <SelectTrigger className="outline-0">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position={alignItemWithTrigger ? 'item-aligned' : 'popper'}>
                <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectWorkspace;
