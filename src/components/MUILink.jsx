import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { forwardRef } from 'react';


const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
    return (<NextLink ref={ref} {...props} />);
});


export default function MUILink(props, ref) {

    let style;
    if (!(props && props.style)) {
        style = {
            style: {
                textDecoration: 'none'
            }
        };
    }
    return (<Link href={ref} {...props} {...style} />);
}
