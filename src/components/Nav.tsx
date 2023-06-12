import { Link } from 'react-router-dom';
import { slugToTag } from '../data/data';
import './style.css';

export default function Nav() {
    const navElements = []
    for (const slug in slugToTag) {
        navElements.push(<Link key={slug} className="navLink" to={"/" + slug}>{slugToTag[slug]}</Link>)
    }
    return <div className="navBar">{navElements}</div>
}
