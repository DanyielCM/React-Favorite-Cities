import classes from './button.module.css'

export default function Button({children, ...props}) {
    return( 
        <button className={classes.button} {...props}>{children}</button>
    );
}