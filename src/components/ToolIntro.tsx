import './ToolIntro.css';
export function ToolIntro({badge,title,description}:{badge:string;title:string;description:string}) {return <section className="tool-intro"><span className="badge">{badge}</span><h1>{title}</h1><p>{description}</p></section>;}
