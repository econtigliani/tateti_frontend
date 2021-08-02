
import { RouteProps } from "react-router-dom"
import './GlobalContent.css'
export default function GlobalContent(props: RouteProps) {
    return (
        <div className="global_content">
            {props.children}
        </div >
    )
}