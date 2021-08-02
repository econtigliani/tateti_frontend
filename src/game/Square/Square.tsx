import classNames from 'classnames';
import './Square.css'
export const Square = (props: {
    disabled: boolean
    onClick: () => any
    value: number
    symbol?:string
}) => {
    const squareClass = (symbol?: string) :string  =>{
    
        return classNames({
        square: true,
        squareX:(symbol === 'X'),
        squareO:(symbol === 'O'),
      })} ;
    return (
        <button
        disabled={props.disabled}
        key = {props.value}
        className={squareClass(props.symbol)}
        onClick={props.onClick}
      />
    )
}
