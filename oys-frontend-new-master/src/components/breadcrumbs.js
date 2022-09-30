import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BreadcrumbsComponent(props) {
   
   
   return (<div className="breadcrumb">
    <Breadcrumbs aria-label="breadcrumb">
    {props.breadcrumbs.map((b,index) => {
        return <Link key={index} underline="hover" color="inherit" href={b.address}>
            {b.name}
        </Link>
    })}
</Breadcrumbs>
</div>);

}